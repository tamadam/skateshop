import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { ROLES } from "@prisma/client";
import { sizesFormSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
    try {
        // check user's role
        const session = await getServerSession(authOptions);
        if (session?.user.role !== ROLES.ADMIN) {
            return NextResponse.json({}, { status: 401 });
        }

        // validate request
        const body = await request.json();
        const validation = sizesFormSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        // create new size
        const newSize = await prisma.size.create({
            data: {
                name: body.name,
                value: body.value,
            },
        });

        return NextResponse.json(newSize, { status: 201 });
    } catch (error) {
        console.log("SIZES_POST: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const sizes = await prisma.size.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(sizes, { status: 200 });
    } catch (error) {
        console.log("SIZES_GET: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}