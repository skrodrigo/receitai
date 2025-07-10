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
	} catch (_error) {
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
	} catch (_error) {
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
	} catch (_error) {
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
	} catch (_error) {
		return { error: "Ocorreu um erro ao favoritar a receita." };
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
