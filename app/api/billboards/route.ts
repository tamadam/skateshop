import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { ROLES } from "@prisma/client";
import { billboardFormSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
    try {
        // check user's role
        const session = await getServerSession(authOptions);
        if (session?.user.role !== ROLES.ADMIN) {
            return NextResponse.json({}, { status: 401 });
        }

        // validate request
        const body = await request.json();
        const validation = billboardFormSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        // create new billboard
        const newBillboard = await prisma.billboard.create({
            data: {
                label: body.label,
                imageUrl: body.imageUrl
            },
        });

        return NextResponse.json(newBillboard, { status: 201 });
    } catch (error) {
        console.log("BILLBOARDS_POST: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const billboards = await prisma.billboard.findMany({
            orderBy: {
                createdAt: "desc"
            },
        });
    
        return NextResponse.json(billboards);
    } catch (error) {
        console.log("BILLBOARDS_GET: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}