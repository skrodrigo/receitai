'use server'

import prisma from '@/lib/prisma';

export async function GetRecipes() {
    try {
        const recipes = await prisma.recipe.findMany({
            orderBy: {
              createdAt: 'desc',
            },
          });
    
        return { success: true, data: recipes, message: 'Receitas obtidas com sucesso.' };
    } catch (error) {
        return { success: false, error: 'Ocorreu um erro ao buscar as receitas.' };
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
            return { success: false, error: 'Receita não encontrada.' };
        }

        return { success: true, data: recipe, message: 'Receita obtida com sucesso.' };
    } catch (error) {
        return { success: false, error: 'Ocorreu um erro ao buscar a receita.' };
    }
}

export async function GetRecipeByCategory(categoryId: string) {
    try {
        const recipes = await prisma.recipe.findMany({
            where: {
                categoryId: categoryId,
            },
        });
        return { success: true, data: recipes, message: 'Receitas da categoria obtidas com sucesso.' };
    } catch (error) {
        return { success: false, error: 'Ocorreu um erro ao buscar as receitas da categoria.' };
    }
}

export const GetFavoriteRecipes = async (userId: string) => {
    try {
        const favoriteRecipes = await prisma.favorite.findMany({
            where: {
                userId: userId,
            },
            include: {
                recipe: true,
            }
        });
    
        const recipes = favoriteRecipes.map(fav => fav.recipe);
        return { success: true, data: recipes, message: 'Receitas favoritas obtidas com sucesso.' };
    } catch (error) {
        return { success: false, error: 'Ocorreu um erro ao buscar as receitas favoritas.' };
    }
}

