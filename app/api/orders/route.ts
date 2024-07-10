import { authOptions } from "@/lib/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const getUserId = async () => {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user.email;

    if (!userEmail) {
      return undefined;
    }

    const user = await prisma.user.findUnique({
        where: {
            email: userEmail,
        },
    });

    return user?.id;
}


export async function GET(request: NextRequest) {
    try {
        const userId = await getUserId();

        if (!userId) {
            return NextResponse.json([], { status: 200 });
        }

        const orders = await prisma.order.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                orderItems: true,
            },
        });

        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.log("ORDERS_GET: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}