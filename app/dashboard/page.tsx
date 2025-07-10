export const dynamic = "force-dynamic";

import CategoryFilter from "@/components/categories/category-filter";
import DashboardHeader from "@/components/dashboard/header/dashboard-header";
import RecipeList from "@/components/recipes/recipe-list";
import { GetCategories } from "@/server/category";
import { GetRecipes } from "@/server/recipe";

interface DashboardPageProps {
	searchParams: Promise<{ categoryId?: string }>;
}

export default async function Page({ searchParams }: DashboardPageProps) {
	const { categoryId } = await searchParams;

	const [categoriesResult, recipesResult] = await Promise.all([
		GetCategories(),
		GetRecipes(categoryId),
	]);

	const categories = categoriesResult.data || [];
	const recipesList = recipesResult.data || [];

	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<DashboardHeader />
				<div className="pt-4">
					<CategoryFilter categories={categories} />
				</div>

				{recipesList.length > 0 ? (
					<RecipeList recipes={recipesList} />
				) : (
					<div className="flex flex-col items-center justify-center h-full text-center p-8 mt-8">
						<h2 className="text-2xl font-bold mb-2">
							Nenhuma Receita Encontrada
						</h2>
						<p className="text-muted-foreground">
							Tente selecionar outra categoria ou adicione novas receitas.
						</p>
					</div>
				)}
			</main>
		</div>
	);
}
