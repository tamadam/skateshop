import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { orderId: string } }
) {
    try {
        // find order
        const order = await prisma.order.findUnique({
            where: {
                id: params.orderId
            },
            include: {
                orderItems: true,
            },
        });

        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        console.log("ORDER_GET: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}