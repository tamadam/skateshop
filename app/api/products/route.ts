import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { ROLES } from "@prisma/client";
import { productsFormSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
    try {
        // check user's role
        const session = await getServerSession(authOptions);
        if (session?.user.role !== ROLES.ADMIN) {
            return NextResponse.json({}, { status: 401 });
        }

        // validate request
        const body = await request.json();
        const validation = productsFormSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        // create new product
        const newProduct = await prisma.product.create({
            data: {
                name: body.name,
                price: body.price,
                categoryId: body.categoryId,
                brandId: body.brandId,
                sizeId: body.sizeId,
                colorId: body.colorId,
                images: {
                    createMany: {
                        data: [
                            ...body.images.map((image: {url: string}) => image)
                        ],
                    },
                },
                gender: body.gender,
                isFeatured: body.isFeatured,
                isArchived: body.isArchived,
            },
            include: {
                images: true,
            },
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.log("PRODUCTS_POST: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const categoryId = searchParams.get("categoryId") || undefined;
        const brandId = searchParams.get("brandId") || undefined;
        const sizeId = searchParams.get("sizeId") || undefined;
        const colorId = searchParams.get("colorId") || undefined;
        const isFeatured = searchParams.get("isFeatured");
       
        const products = await prisma.product.findMany({
            where: {
                categoryId,
                brandId,
                sizeId,
                colorId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false,
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                images: true,
                category: true,
                brand: true,
                size: true,
                color: true,
            },
        });
    
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.log("PRODUCTS_GET: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}