import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {

    interface User {
        firstName: string;
        lastName: string;
        role: string;
    }

    interface Session {
        user: User & {
            firstName: string;
            lastName: string;
            role: string;
        };
        token: {
            firstName: string;
            lastName: string;
            role: string;
        }
  }
}