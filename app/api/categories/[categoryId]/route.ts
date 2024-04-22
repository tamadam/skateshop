import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ROLES } from "@prisma/client";
import { categoriesFormSchema } from "@/app/validationSchemas";


export async function GET(
    request: NextRequest,
    { params }: { params: { categoryId: string } }
) {
    try {
        // find category
        const category = await prisma.category.findUnique({
            where: {
                id: params.categoryId
            },
        });

        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        console.log("CATEGORY_GET: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { categoryId: string } }
) {
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

        // find category
        const category = await prisma.category.findUnique({
            where: {
                id: params.categoryId,
            },
        });

        if (!category) {
            return NextResponse.json("Category does not exist", { status: 404 });
        }

        // update category
        const updatedCategory = await prisma.category.update({
            where: {
                id: category.id,
            },
            data: {
                name: body.name,
                billboardId: body.billboardId,
                parentId: body.parentCategoryId
            },
        });

        return NextResponse.json(updatedCategory, { status: 200 });
    } catch (error) {
        console.log("CATEGORY_PATCH: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { categoryId: string } }
) {
    try {
          // check user's role
        const session = await getServerSession(authOptions);
        if (session?.user.role !== ROLES.ADMIN) {
            return NextResponse.json({}, { status: 401 });
        } 

        // find category
        const category = await prisma.category.findUnique({
            where: {
                id: params.categoryId,
            },
        });

        if (!category) {
            return NextResponse.json("Category does not exist", { status: 404 });
        }

        // delete category
        await prisma.category.delete({
            where: {
                id: category.id,
            },
        });

        return NextResponse.json({}, { status: 200 });  
    } catch (error) {
        console.log("CATEGORY_DELETE: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}