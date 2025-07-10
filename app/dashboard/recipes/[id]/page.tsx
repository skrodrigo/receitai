import { Clock, Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { GetRecipeById } from "@/server/recipe";

export default async function RecipePage({
	params,
}: {
	params: { id: string };
}) {
	const { data: recipe, error } = await GetRecipeById(params.id);

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

	return (
		<div className="container mx-auto p-4 md:p-8 bg-muted/40 min-h-screen">
			<article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
				{recipe.image && (
					<div className="relative w-full h-64 md:h-96">
						<Image
							src={recipe.image}
							alt={recipe.title}
							layout="fill"
							objectFit="cover"
						/>
					</div>
				)}
				<div className="p-6 md:p-8">
					<h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
						{recipe.title}
					</h1>
					<p className="text-lg text-gray-600 mb-6">{recipe.description}</p>

					<div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 text-gray-500 border-t border-b py-4">
						<div className="flex items-center gap-2">
							<Clock className="w-5 h-5" />
							<span>{recipe.time}</span>
						</div>
						<div className="flex items-center gap-2">
							<Badge variant="outline">{recipe.difficulty}</Badge>
						</div>
						<div className="flex items-center gap-2">
							<Star className="w-5 h-5 text-yellow-500 fill-current" />
							<span className="font-semibold">{recipe.rating}</span>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="md:col-span-1">
							<h2 className="text-2xl font-semibold mb-4 border-b pb-2">
								Ingredientes
							</h2>
							<ul className="list-disc list-inside space-y-2 text-gray-700">
								{ingredients.map((ingredient, _index) => (
									<li key={ingredient}>{ingredient}</li>
								))}
							</ul>
						</div>

						<div className="md:col-span-2">
							<h2 className="text-2xl font-semibold mb-4 border-b pb-2">
								Modo de Preparo
							</h2>
							<ol className="list-decimal list-inside space-y-4 text-gray-700">
								{instructions.map((instruction, _index) => (
									<li key={instruction}>{instruction}</li>
								))}
							</ol>
						</div>
					</div>
				</div>
			</article>
		</div>
	);
}
