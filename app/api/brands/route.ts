import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { ROLES } from "@prisma/client";
import { brandsFormSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
    try {
        // check user's role
        const session = await getServerSession(authOptions);
        if (session?.user.role !== ROLES.ADMIN) {
            return NextResponse.json({}, { status: 401 });
        }

        // validate request
        const body = await request.json();
        const validation = brandsFormSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        // create new brand
        const newBrand = await prisma.brand.create({
            data: {
                name: body.name,
                imageUrl: body.imageUrl
            },
        });

        return NextResponse.json(newBrand, { status: 201 });
    } catch (error) {
        console.log("BRANDS_POST: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const brands = await prisma.brand.findMany({
            orderBy: {
                createdAt: "desc"
            },
        });
    
        return NextResponse.json(brands, { status: 200 });
    } catch (error) {
        console.log("BRANDS_GET: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}