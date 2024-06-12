import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

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

export async function POST(request: NextRequest) {
    const items: {id: string, name: string; price: string; quantity: string}[] = await request.json();
    const productIds = items.map((item) => item.id);

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    if (!items || items.length === 0) {
        return NextResponse.json("Products are required", { status: 400 });
    }

    for (const item of items) {
      const product = products.find(p => p.id === item.id);
      if (product && (product.quantity - Number(item.quantity)) <= 0) {
        return NextResponse.json(`Insufficient stock for product ${item.name}`, { status: 400 });
      }
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
            create: items.map((item) => ({
              product: {
                connect: {
                  id: item.id,
                },
              },
              quantity: Number(item.quantity),
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