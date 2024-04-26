import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ROLES } from "@prisma/client";
import { productsFormSchema } from "@/app/validationSchemas";

export async function GET(
    request: NextRequest,
    { params }: { params: { productId: string } }
) {
    try {
        // find product
        const product = await prisma.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
            },
        });

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.log("PRODUCT_GET: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params } : { params: { productId: string } }
) {
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
            return NextResponse.json(validation.error.format(), { status: 400 })
        }

        // find product
        const product = await prisma.product.findUnique({
            where: {
                id: params.productId,
            },
        });

        if (!product) {
            return NextResponse.json("Product does not exist", { status: 404 });
        }

        // update product
        await prisma.product.update({
            where: {
                id: product.id,
            },
            data: {
                name: body.name,
                price: body.price,
                categoryId: body.categoryId,
                brandId: body.brandId,
                sizeId: body.sizeId,
                colorId: body.colorId,
                images: {
                    deleteMany: {}
                },
                gender: body.gender,
                isFeatured: body.isFeatured,
                isArchived: body.isArchived,
            },
        });

        const updatedProduct = await prisma.product.update({
            where: {
                id: params.productId,
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...body.images.map((image: {url: string}) => image)
                        ],
                    },
                },
            },
            include: {
                images: true,
            },
        });

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        console.log("PRODUCT_PATCH: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { productId: string }}
) {
    try {
        // check user's role
        const session = await getServerSession(authOptions);
        if (session?.user.role !== ROLES.ADMIN) {
            return NextResponse.json({}, { status: 401 });
        }

        // find product
        const product = await prisma.product.findUnique({
            where: {
                id: params.productId,
            },
        });

        if (!product) {
            return NextResponse.json("Product does not exist", { status: 404 });
        }

        // delete product
        await prisma.product.deleteMany({
            where: {
                id: product.id,
            }
        });

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.log("PRODUCT_DELETE: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}