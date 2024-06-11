import Stripe from "stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!,
        )
    } catch (error: any) {
        return NextResponse.json(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;
    const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country,
    ];

    const addressString = addressComponents.filter((component) => component !== null).join(", ");

    if (event.type === "checkout.session.completed") {
        const order = await prisma.order.update({
            where: {
                id: session?.metadata?.orderId,
            },
            data: {
                isPaid: true,
                address: addressString,
                phone: session?.customer_details?.phone || "",
            },
            include: {
                orderItems: true,
            },
        });

        const productUpdates = order.orderItems.map(async (orderItem) => {
            const product = await prisma.product.findUnique({
                where: { id: orderItem.productId },
            });

            let newQuantity;

            if (product) {
                newQuantity = Math.max(product.quantity - orderItem.quantity, 0);
            }

            await prisma.product.update({
                where: { id: orderItem.productId },
                data: { quantity: newQuantity },
            });
        });

        // Execute all product updates
        await Promise.all(productUpdates);

    }

    return NextResponse.json(null, { status: 200 });
}