import { ChefHat, Clock, Star } from "lucide-react";
import Image from "next/image";
import FavoriteButton from "@/components/recipes/favorite-button";
import BackButton from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { GetRecipeById, isRecipeFavorited } from "@/server/recipe";

export const dynamic = "force-dynamic";

interface RecipePageProps {
	params: Promise<{ id: string }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
	const { id } = await params;
	const { data: recipe, error } = await GetRecipeById(id);

	if (error || !recipe) {
		return (
			<div className="flex items-center justify-center h-screen">
				Receita não encontrada ou erro ao carregar.
			</div>
		);
	}

	const ingredients = Array.isArray(recipe.ingredients)
		? (recipe.ingredients as string[])
		: [];
	const instructions = Array.isArray(recipe.instructions)
		? (recipe.instructions as string[])
		: [];

	const isFavorited = await isRecipeFavorited(recipe.id);

	return (
		<div className="bg-muted/40 min-h-screen py-12">
			<div className="container mx-auto px-4">
				<BackButton href="/dashboard" label="Voltar" />
				<article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
					{recipe.image && (
						<div className="relative w-full h-64 md:h-96">
							<Image
								src={recipe.image}
								alt={recipe.title}
								fill
								style={{ objectFit: "cover" }}
							/>
						</div>
					)}
					<div className="p-6 md:p-8">
						<div className="flex justify-between items-start mb-4">
							<h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight flex-1 pr-4">
								{recipe.title}
							</h1>
							<FavoriteButton
								recipeId={recipe.id}
								initialIsFavorited={isFavorited}
							/>
						</div>
						<p className="text-lg text-gray-600 mb-8 leading-relaxed">
							{recipe.description}
						</p>

						<div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-8 text-gray-700 border-t border-b py-5">
							<div className="flex items-center gap-2 font-medium">
								<Clock className="w-5 h-5 text-primary" />
								<span>{recipe.time}</span>
							</div>
							<div className="flex items-center gap-2 font-medium">
								<ChefHat className="w-5 h-5 text-primary" />
								<Badge variant="secondary">{recipe.difficulty}</Badge>
							</div>
							<div className="flex items-center gap-2 font-medium">
								<Star className="w-5 h-5 text-amber-500 fill-current" />
								<span className="font-bold text-gray-900">{recipe.rating}</span>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="md:col-span-1">
								<h2 className="text-2xl font-bold mb-4 text-gray-800">
									Ingredientes
								</h2>
								<ul className="list-disc list-inside space-y-3 text-gray-700 pl-2">
									{ingredients.map((ingredient, _index) => (
										<li key={ingredient}>{ingredient}</li>
									))}
								</ul>
							</div>

							<div className="md:col-span-2">
								<h2 className="text-2xl font-bold mb-4 text-gray-800">
									Modo de Preparo
								</h2>
								<ol className="list-decimal list-inside space-y-4 text-gray-700 pl-2">
									{instructions.map((instruction, _index) => (
										<li key={instruction}>{instruction}</li>
									))}
								</ol>
							</div>
						</div>
					</div>
				</article>
			</div>
		</div>
	);
}
