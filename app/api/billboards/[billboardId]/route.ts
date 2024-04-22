import { billboardFormSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ROLES } from "@prisma/client";

export async function GET(
    request: NextRequest,
    { params }: { params: { billboardId: string } }
) {
    try {
        // find billboard
        const billboard = await prisma.billboard.findUnique({
            where: {
                id: params.billboardId,
            },
        });

        return NextResponse.json(billboard, { status: 200 });
    } catch (error) {
        console.log("BILLBOARD_GET: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params } : { params: { billboardId: string } }
) {
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
            return NextResponse.json(validation.error.format(), { status: 400 })
        }

        // find billboard
        const billboard = await prisma.billboard.findUnique({
            where: {
                id: params.billboardId,
            },
        });

        if (!billboard) {
            return NextResponse.json("Billboard does not exist", { status: 404 });
        }

        // update billboard
        const updatedBillboard = await prisma.billboard.update({
            where: {
                id: billboard.id,
            },
            data: {
                label: body.label,
                imageUrl: body.imageUrl
            },
        });

        return NextResponse.json(updatedBillboard, { status: 200 });
    } catch (error) {
        console.log("BILLBOARD_PATCH: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { billboardId: string }}
) {
    try {
        // check user's role
        const session = await getServerSession(authOptions);
        if (session?.user.role !== ROLES.ADMIN) {
            return NextResponse.json({}, { status: 401 });
        }

        // find billboard
        const billboard = await prisma.billboard.findUnique({
            where: {
                id: params.billboardId,
            },
        });

        if (!billboard) {
            return NextResponse.json("Billboard does not exist", { status: 404 });
        }

        // delete billboard
        await prisma.billboard.delete({
            where: {
                id: billboard.id,
            },
        });

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.log("BILLBOARD_DELETE: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}