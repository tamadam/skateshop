import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { ROLES } from "@prisma/client";
import { colorsFormSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
    try {
        // check user's role
        const session = await getServerSession(authOptions);
        if (session?.user.role !== ROLES.ADMIN) {
            return NextResponse.json({}, { status: 401 });
        }

        // validate request
        const body = await request.json();
        const validation = colorsFormSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        // create new color
        const newColor = await prisma.color.create({
            data: {
                name: body.name,
                value: body.value,
            },
        });

        return NextResponse.json(newColor, { status: 201 });
    } catch (error) {
        console.log("COLORS_POST: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const colors = await prisma.color.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(colors, { status: 200 });
    } catch (error) {
        console.log("COLORS_GET: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}