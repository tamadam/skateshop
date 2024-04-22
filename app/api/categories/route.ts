import { categoriesFormSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { ROLES } from "@prisma/client";

export async function POST(request: NextRequest) {
    try {
        // check user's role
        const session = await getServerSession(authOptions);
        if (session?.user.role !== ROLES.ADMIN) {
            return NextResponse.json({}, { status: 401 });
        }

        // validate request
        const body = await request.json();
        const validation = categoriesFormSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        // create new category
        const newCategory = await prisma.category.create({
            data: {
                name: body.name,
                billboardId: body.billboardId,
                parentCategoryId: body.parentCategoryId
            },
        });

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.log("CATEGORIES_POST: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.log("CATEGORIES_GET: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}