"use client";

import { useState } from "react";
import type { Recipe } from "@/app/generated/prisma";
import { Button } from "../ui/button";
import RecipeCard from "./recipe-card";

interface RecipeListProps {
	recipes: Recipe[];
	unlockedRecipeIds?: Set<string>;
}

export default function RecipeList({
	recipes,
	unlockedRecipeIds,
}: RecipeListProps) {
	const unlockedSet = unlockedRecipeIds ?? new Set<string>();
	const [visibleRecipes, setVisibleRecipes] = useState(6);

	const showMoreRecipes = () => {
		setVisibleRecipes((prev) => prev + 6);
	};

	const showLessRecipes = () => {
		setVisibleRecipes(6);
	};

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-6">
				{recipes.slice(0, visibleRecipes).map((recipe) => (
					<RecipeCard
						key={recipe.id}
						recipe={recipe}
						isUnlocked={unlockedSet.has(recipe.id)}
					/>
				))}
			</div>
			<div className="flex flex-col space-y-3 items-center justify-center">
				<Button
					onClick={showMoreRecipes}
					disabled={visibleRecipes >= recipes.length}
					className="w-full max-w-sm"
				>
					Ver Mais Receitas
				</Button>
				<Button
					onClick={showLessRecipes}
					disabled={visibleRecipes <= 6}
					variant="outline"
					className="w-full max-w-sm"
				>
					Ver Menos Receitas
				</Button>
			</div>
		</div>
	);
}
