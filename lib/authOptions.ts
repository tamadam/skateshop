import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
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
                lastName: user.lastName,
                role: user.role
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
    callbacks: {
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    firstName: token.firstName,
                    lastName: token.lastName,
                    role: token.role
                }
            }
        },

        async jwt({ token, user}) {

            if (user) {
                return {
                    ...token,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                };
            }
            return token;
        }
    }
}