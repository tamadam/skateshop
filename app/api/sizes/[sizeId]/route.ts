import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { sizesFormSchema } from "@/app/validationSchemas";
import { ROLES } from "@prisma/client";

export async function GET(
    request: NextRequest,
    { params }: { params: { sizeId: string } }
) {
    try {
        // find size
        const size = await prisma.size.findUnique({
            where: {
                id: params.sizeId
            },
        });

        return NextResponse.json(size, { status: 200 });
    } catch (error) {
        console.log("SIZE_GET: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { sizeId: string } }
) {
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

        // find size
        const size = await prisma.size.findUnique({
            where: {
                id: params.sizeId,
            },
        });

        if (!size) {
            return NextResponse.json("Size does not exist", { status: 404 });
        }

        // update size
        const updatedSize = await prisma.size.update({
            where: {
                id: size.id,
            },
            data: {
                name: body.name,
                value: body.value,
            },
        });

        return NextResponse.json(updatedSize, { status: 200 });
    } catch (error) {
        console.log("SIZE_PATCH: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { sizeId: string } }
) {
    try {
          // check user's role
        const session = await getServerSession(authOptions);
        if (session?.user.role !== ROLES.ADMIN) {
            return NextResponse.json({}, { status: 401 });
        } 

        // find size
        const size = await prisma.size.findUnique({
            where: {
                id: params.sizeId,
            },
        });

        if (!size) {
            return NextResponse.json("Size does not exist", { status: 404 });
        }

        // delete size
        await prisma.size.delete({
            where: {
                id: size.id,
            },
        });

        return NextResponse.json({}, { status: 200 });  
    } catch (error) {
        console.log("SIZE_DELETE: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}