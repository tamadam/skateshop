import { signUpFormSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { hash } from "bcrypt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { ROLES } from "@prisma/client";


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const validation = signUpFormSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        const { firstName, lastName, email, password } = body;

        const isEmailExist = await prisma.user.findUnique({
            where: {
                email
            },
        });

        if (isEmailExist) {
            return NextResponse.json({ user: null, message: "This email is already in use"}, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword
            },
        });

        const { password: newUserPassword, ...newUserWithoutPassword} = newUser;

        return NextResponse.json({ user: newUserWithoutPassword, message: "User successfully created"}, { status: 201 });
    } catch (error) {
        console.log("USERS_POST: ", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}


export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user.role !== ROLES.ADMIN) {
            return NextResponse.json({}, { status: 401 });
        }
        
        const users = await prisma.user.findMany({
            orderBy: {
                firstName: "asc",
            },
        });
    
        return NextResponse.json(users); 
    } catch (error) {
        console.log("USERS_GET: ", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}