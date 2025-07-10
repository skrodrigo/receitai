import { PrismaClient } from "../app/generated/prisma";
import {
	categories as mockCategories,
	recipes as mockRecipes,
} from "../components/recipes/data-recipe";

const prisma = new PrismaClient();

async function main() {
	console.log("Start seeding ...");

	await prisma.recipe.deleteMany({});
	await prisma.category.deleteMany({});
	console.log("Cleaned up previous data.");

	const categoryMap = new Map<string, string>();

	for (const category of mockCategories) {
		const createdCategory = await prisma.category.create({
			data: {
				name: category.name,
			},
		});
		categoryMap.set(category.id, createdCategory.id);
	}
	console.log(`Created ${mockCategories.length} categories.`);

	for (const recipe of mockRecipes) {
		const categoryId = categoryMap.get(recipe.categoryId);
		if (!categoryId) {
			console.warn(
				`Category not found for recipe: "${recipe.title}". Skipping.`,
			);
			continue;
		}

		await prisma.recipe.create({
			data: {
				title: recipe.title,
				description: recipe.description,
				image: recipe.image,
				time: recipe.time,
				difficulty: recipe.difficulty,
				rating: recipe.rating,
				isPublic: recipe.isPublic,
				ingredients: recipe.ingredients,
				instructions: recipe.instructions,
				categoryId: categoryId,
			},
		});
	}
	console.log(`Created ${mockRecipes.length} recipes.`);

	console.log("Seeding finished.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
