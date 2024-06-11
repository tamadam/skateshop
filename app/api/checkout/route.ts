import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

const getUserId = async () => {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user.email ?? undefined,
        },
    });

    return user?.id;
}

// TODO : decrease quantity of existing products after payment
export async function POST(request: NextRequest) {
   
    const items: {id: string, name: string; price: string; quantity: string}[] = await request.json();
    const productIds = items.map((item) => item.id);    

    if (!items || items.length === 0) {
        return NextResponse.json("Products are required", { status: 400 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    items.forEach((product) => {
        line_items.push({
            quantity: Number(product.quantity),
            price_data: {
                currency: "EUR",
                product_data: {
                    name: product.name
                },
                unit_amount: Number(product.price) * 100,
            },
        });
    });

    // check if the user is logged in
    const userId = await getUserId();

    const order = await prisma.order.create({
        data: {
          userId,
          isPaid: false,
          address: "",
          phone: "",
          orderItems: {
            create: productIds.map((productId) => ({
              product: {
                connect: {
                  id: productId,
                },
              },
            })),
          },
        },
    });

    const paymentSession = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        billing_address_collection: 'required',
        phone_number_collection: {
          enabled: true,
        },
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart?success=1`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart?canceled=1`,
        metadata: {
          orderId: order.id,
        },
    });

    return NextResponse.json({ url: paymentSession.url }, { headers: corsHeaders });
}