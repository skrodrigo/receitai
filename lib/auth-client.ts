import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
	baseURL: "https://receitai.vercel.app/",
});

export const { signIn, signUp, useSession } = createAuthClient();
