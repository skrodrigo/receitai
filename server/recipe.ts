"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GetRecipes(categoryId?: string) {
	try {
		const recipes = await prisma.recipe.findMany({
			where: categoryId ? { categoryId } : {},
			orderBy: {
				createdAt: "desc",
			},
		});

		return {
			success: true,
			data: recipes,
			message: "Receitas obtidas com sucesso.",
		};
	} catch (error) {
		console.error(error);
		return { success: false, error: "Ocorreu um erro ao buscar as receitas." };
	}
}

export const GetRecipeById = async (id: string) => {
	try {
		const recipe = await prisma.recipe.findUnique({
			where: {
				id,
			},
		});

		if (!recipe) {
			return { success: false, error: "Receita não encontrada." };
		}

		return {
			success: true,
			data: recipe,
			message: "Receita obtida com sucesso.",
		};
	} catch (error) {
		console.error(error);
		return { success: false, error: "Ocorreu um erro ao buscar a receita." };
	}
};

export const GetFavoriteRecipes = async (userId: string) => {
	try {
		const favoriteRecipes = await prisma.favorite.findMany({
			where: {
				userId: userId,
			},
			include: {
				recipe: true,
			},
		});

		const recipes = favoriteRecipes.map((fav) => fav.recipe);
		return {
			success: true,
			data: recipes,
			message: "Receitas favoritas obtidas com sucesso.",
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			error: "Ocorreu um erro ao buscar as receitas favoritas.",
		};
	}
};

export async function toggleFavorite(recipeId: string) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const userId = session?.user?.id;

	if (!userId) {
		return { error: "Usuário não autenticado." };
	}

	try {
		const existingFavorite = await prisma.favorite.findUnique({
			where: {
				userId_recipeId: {
					userId,
					recipeId,
				},
			},
		});

		if (existingFavorite) {
			await prisma.favorite.delete({
				where: {
					id: existingFavorite.id,
				},
			});
			revalidatePath(`/dashboard/recipes/${recipeId}`);
			return { success: true, isFavorited: false };
		} else {
			await prisma.favorite.create({
				data: {
					userId,
					recipeId,
				},
			});
			revalidatePath(`/dashboard/recipes/${recipeId}`);
			return { success: true, isFavorited: true };
		}
	} catch (error) {
		console.error(error);
		return { error: "Ocorreu um erro ao favoritar a receita." };
	}
}

export async function unlockRecipe(recipeId: string) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return { success: false, error: "Usuário não autenticado." };
	}

	const userId = session.user.id;

	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { credits: true },
		});

		if (!user || user.credits < 1) {
			return { success: false, error: "Créditos insuficientes." };
		}

		await prisma.$transaction([
			prisma.user.update({
				where: { id: userId },
				data: { credits: { decrement: 1 } },
			}),
			prisma.userRecipe.create({
				data: {
					userId,
					recipeId,
				},
			}),
		]);

		revalidatePath(`/dashboard/recipes/${recipeId}`);
		return { success: true, message: "Receita desbloqueada com sucesso!" };
	} catch (error) {
		console.error(error);
		return {
			success: false,
			error: "Ocorreu um erro ao desbloquear a receita.",
		};
	}
}

export async function isRecipeFavorited(recipeId: string) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const userId = session?.user?.id;

	if (!userId) {
		return false;
	}

	try {
		const favorite = await prisma.favorite.findUnique({
			where: {
				userId_recipeId: {
					userId,
					recipeId,
				},
			},
		});

		return !!favorite;
	} catch (_error) {
		return false;
	}
}

export async function isRecipeUnlocked(recipeId: string) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const userId = session?.user?.id;

	if (!userId) {
		return false;
	}

	try {
		const unlockedRecipe = await prisma.userRecipe.findUnique({
			where: {
				userId_recipeId: {
					userId,
					recipeId,
				},
			},
		});

		return !!unlockedRecipe;
	} catch (_error) {
		return false;
	}
}

export async function getUnlockedRecipes() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const userId = session?.user?.id;

	if (!userId) {
		return { success: false, error: "Usuário não autenticado." };
	}

	try {
		const userRecipes = await prisma.userRecipe.findMany({
			where: {
				userId: userId,
			},
			include: {
				recipe: true,
			},
			orderBy: {
				unlockedAt: "desc",
			},
		});

		const recipes = userRecipes.map((ur) => ur.recipe);

		return {
			success: true,
			data: recipes,
			message: "Receitas desbloqueadas obtidas com sucesso.",
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			error: "Ocorreu um erro ao buscar as receitas desbloqueadas.",
		};
	}
}
