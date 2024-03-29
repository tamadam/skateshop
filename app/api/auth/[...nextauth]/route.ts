import NextAuth, { NextAuthOptions } from "next-auth";
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
          name: "credentials",
          credentials: {},
          async authorize(credentials) {

            const { email, password } = credentials as { email: string, password: string };


            if (!email || !password) {
                throw new Error("Invalid email or password");
            }

            const user = await prisma.user.findUnique({
                where: {
                    email
                },
            });

            if (!user) {
                throw new Error("Invalid email or password");
            }

            const passwordMatch = await compare(password, user.password)

            if (!passwordMatch) {
                throw new Error("Invalid email or password");
            }

            return {
                id: `${user.id}`,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            };
          }
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
  

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }