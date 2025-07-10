"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/lib/auth";

import prisma from "@/lib/prisma";

import { userSchema } from "@/server/user-schema";

export const getUserById = async (id: string) => {
    const currentUser = await prisma.user.findFirst({
        where: {
            id,
        },
    });

    return currentUser;
}

export const getUserByEmail = async (email: string) => {
    const currentUser = await prisma.user.findFirst({
        where: {
            email,
        },
    });

    return currentUser;
}

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        redirect("/login");
    }

    const currentUser = await prisma.user.findFirst({
        where: {
            id: session?.user?.id,
        },
    });

    if (!currentUser) {
        redirect("/login");
    }

    return {
        ...session,
        user: currentUser,
    };
}

export const signIn = async (_: unknown, formData: FormData): Promise<{
    errors: Record<string, string[]>;
    values: Record<string, string>;
    redirect?: string;
}> => {
    const formValues = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    try {
        const signInResult = await auth.api.signInEmail({
            body: {
                email: formValues.email,
                password: formValues.password,
            },

        })

        return {
            errors: {},
            values: {
                text: "Successfully signed in.",
            },
            redirect: "/dashboard",
        }
    } catch (e: unknown) {
        const error = e as Error;
        return {
            errors: { message: [error.message || 'An unknown error occurred'] },
            values: {},
        }
    }
}

export const signUp = async (_: unknown, formData: FormData): Promise<{
    errors: Record<string, string[]>;
    values: Record<string, string>;
    redirect?: string;
}> => {
    const formValues = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        name: formData.get("name") as string,
    }

    try {
        const signUpResult = await auth.api.signUpEmail({
            body: {
                email: formValues.email,
                password: formValues.password,
                name: formValues.name,
            }
        })

        return {
            errors: {},
            values: {
                text: "Successfully signed up.",
            },
            redirect: "/dashboard",
        }
    } catch (e) {
        const error = e as Error;
        return {
            errors: { message: [error.message || 'An unknown error occurred'] },
            values: {},
        }
    }
}

export const signOut = async () => {
    await auth.api.signOut({
        headers: await headers(),
    });
    redirect("/login");
};

export const getUserProfile = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        throw new Error("User not found");
    }

    const userProfile = await prisma.user.findFirst({
        where: {
            id: session?.user?.id,
        },
    });

    return userProfile;
}

export const updateProfile = async (data: z.infer<typeof userSchema>) => {
    const session = await getUserSession();

    try {
        await prisma.user.update({
            where: {
                id: session?.user?.id,
            },
            data,
        });

        return {
            values: {
                text: "Successfully updated profile.",
            },
            redirect: "/dashboard",
        }
    } catch (e) {
        const error = e as Error;
        return {
            errors: { message: [error.message || 'An unknown error occurred'] },
        }
    }
}