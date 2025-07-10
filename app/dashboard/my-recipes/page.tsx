import RecipeCard from "@/components/recipes/recipe-card";
import BackButton from "@/components/ui/back-button";
import { getUnlockedRecipes } from "@/server/recipe";

export default async function MyRecipesPage() {
	const { data: recipes, error } = await getUnlockedRecipes();

	if (error || !recipes) {
		return (
			<div className="text-center py-12">
				<p className="text-red-500">
					{error || "Ocorreu um erro ao buscar suas receitas."}
				</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-12">
			<BackButton href="/dashboard" label="Voltar" />
			<h1 className="text-4xl font-bold my-8">Minhas Receitas</h1>

			{recipes.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
					{recipes.map((recipe) => (
						<RecipeCard key={recipe.id} recipe={recipe} isUnlocked={true} />
					))}
				</div>
			) : (
				<div className="text-center py-12">
					<p className="text-lg text-gray-600">
						Você ainda não desbloqueou nenhuma receita.
					</p>
				</div>
			)}
		</div>
	);
}
