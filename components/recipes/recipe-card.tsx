import { Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/app/generated/prisma";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";

interface RecipeCardProps {
	recipe: Recipe;
	isUnlocked?: boolean;
}

export default function RecipeCard({
	recipe,
	isUnlocked = false,
}: RecipeCardProps) {
	return (
		<Card
			key={recipe.id}
			className="overflow-hidden border border-border hover:border-primary py-0 pb-4 transition-all duration-300 hover:shadow-xl bg-white/90 backdrop-blur-sm"
		>
			<div className="relative">
				<Image
					src={recipe.image || "/placeholder.svg"}
					alt={recipe.title}
					width={500}
					height={500}
					className="w-full h-48 object-cover"
				/>
				<div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-sm font-medium">
					<Star className="inline h-3 w-3 mr-1" />
					{recipe.rating}
				</div>
			</div>
			<CardHeader>
				<CardTitle className="text-primary flex items-center justify-between">
					{recipe.title}
				</CardTitle>
				<div className="flex items-center space-x-4 text-sm text-foreground">
					<div className="flex items-center">
						<Clock className="h-4 w-4 mr-1" />
						{recipe.time}
					</div>
					<Badge variant="outline" className="border-border text-foreground">
						{recipe.difficulty}
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="flex-1">
				<div className="relative">
					<p
						className={`text-primary ${
							!isUnlocked ? "blur-sm select-none" : ""
						}`}
					>
						{recipe.description}
					</p>
				</div>
			</CardContent>
			<CardFooter className="bottom-0">
				<Button asChild className="w-full bg-primary hover:bg-primary">
					<Link href={`/dashboard/recipes/${recipe.id}`}>
						{isUnlocked ? "Ver Receita" : "🔓 Desbloquear Receita"}
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
