import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ROLES } from "@prisma/client";
import { colorsFormSchema } from "@/app/validationSchemas";

export async function GET(
    request: NextRequest,
    { params }: { params: { colorId: string } }
) {
    try {
        // find color
        const color = await prisma.color.findUnique({
            where: {
                id: params.colorId
            },
        });

        return NextResponse.json(color, { status: 200 });
    } catch (error) {
        console.log("COLOR_GET: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { colorId: string } }
) {
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

        // find color
        const color = await prisma.color.findUnique({
            where: {
                id: params.colorId,
            },
        });

        if (!color) {
            return NextResponse.json("Color does not exist", { status: 404 });
        }

        // update color
        const updatedColor = await prisma.color.update({
            where: {
                id: color.id,
            },
            data: {
                name: body.name,
                value: body.value,
            },
        });

        return NextResponse.json(updatedColor, { status: 200 });
    } catch (error) {
        console.log("COLOR_PATCH: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { colorId: string } }
) {
    try {
          // check user's role
        const session = await getServerSession(authOptions);
        if (session?.user.role !== ROLES.ADMIN) {
            return NextResponse.json({}, { status: 401 });
        } 

        // find color
        const color = await prisma.color.findUnique({
            where: {
                id: params.colorId,
            },
        });

        if (!color) {
            return NextResponse.json("Color does not exist", { status: 404 });
        }

        // delete color
        await prisma.color.delete({
            where: {
                id: color.id,
            },
        });

        return NextResponse.json({}, { status: 200 });  
    } catch (error) {
        console.log("COLOR_DELETE: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}