import prisma from "@/prisma/client";
import { ROLES } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { brandsFormSchema } from "@/app/validationSchemas";

export async function GET(
    request: NextRequest,
    { params }: { params: { brandId: string } }
) {
    try {
        // find brand
        const brand = await prisma.brand.findUnique({
            where: {
                id: params.brandId,
            },
        });

        return NextResponse.json(brand, { status: 200 });
    } catch (error) {
        console.log("BRAND_GET: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params } : { params: { brandId: string } }
) {
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
            return NextResponse.json(validation.error.format(), { status: 400 })
        }

        // find brand
        const brand = await prisma.brand.findUnique({
            where: {
                id: params.brandId,
            },
        });

        if (!brand) {
            return NextResponse.json("Brand does not exist", { status: 404 });
        }

        // update brand
        const updatedBrand = await prisma.brand.update({
            where: {
                id: brand.id,
            },
            data: {
                name: body.name,
                imageUrl: body.imageUrl
            },
        });

        return NextResponse.json(updatedBrand, { status: 200 });
    } catch (error) {
        console.log("BRAND_PATCH: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { brandId: string }}
) {
    try {
        // check user's role
        const session = await getServerSession(authOptions);
        if (session?.user.role !== ROLES.ADMIN) {
            return NextResponse.json({}, { status: 401 });
        }

        // find brand
        const brand = await prisma.brand.findUnique({
            where: {
                id: params.brandId,
            },
        });

        if (!brand) {
            return NextResponse.json("Brand does not exist", { status: 404 });
        }

        // delete brand
        await prisma.brand.delete({
            where: {
                id: brand.id,
            },
        });

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.log("BRAND_DELETE: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}