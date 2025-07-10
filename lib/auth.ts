import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from '../app/generated/prisma'
import { nextCookies } from "better-auth/next-js"; 

export const prisma = new PrismaClient()

export const auth = betterAuth({
    plugins: [nextCookies()],
    
    emailAndPassword: {  
        enabled: true
    },

    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
});