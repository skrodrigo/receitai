"use client";

import { Star } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toggleFavorite } from "@/server/recipe";

interface FavoriteButtonProps {
	recipeId: string;
	initialIsFavorited: boolean;
}

export default function FavoriteButton({
	recipeId,
	initialIsFavorited,
}: FavoriteButtonProps) {
	const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		startTransition(async () => {
			setIsFavorited((prev) => !prev);

			const result = await toggleFavorite(recipeId);

			if (result.error) {
				setIsFavorited((prev) => !prev);
				console.error(result.error);
			}
		});
	};

	return (
		<Button
			onClick={handleClick}
			disabled={isPending}
			variant="outline"
			size="lg"
			className="flex items-center gap-2 transition-colors duration-200 ease-in-out"
		>
			<Star
				className={cn(
					"h-5 w-5",
					isFavorited ? "text-primary fill-current" : "text-foreground",
				)}
			/>
			<span>
				{isFavorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
			</span>
		</Button>
	);
}
