import { GetRecipes } from "@/server/recipe";
import RecipeList from "./recipes/recipe-list";

export default async function RecipesSection() {
	const { data: recipesList } = await GetRecipes();
	return (
		<section id="receitas" className="py-16">
			<div className="container mx-auto px-4">
				<h3 className="text-3xl font-bold text-center text-primary mb-12">
					🔥 Receitas Premium Exclusivas
				</h3>
				{recipesList && <RecipeList recipes={recipesList} />}
			</div>
		</section>
	);
}
