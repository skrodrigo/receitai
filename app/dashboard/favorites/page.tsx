import { headers } from "next/headers";
import RecipeList from "@/components/recipes/recipe-list";
import BackButton from "@/components/ui/back-button";
import { auth } from "@/lib/auth";
import { GetFavoriteRecipes, getUnlockedRecipes } from "@/server/recipe";

export default async function MyFavoritesPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const user = session?.user;

	if (!user) {
		return (
			<div className="flex flex-col items-center justify-center h-full text-center p-8">
				<h2 className="text-2xl font-bold mb-2">Acesso Negado</h2>
				<p className="text-muted-foreground">
					Você precisa estar logado para ver suas receitas favoritas.
				</p>
			</div>
		);
	}

	const result = await GetFavoriteRecipes(user.id);

	if (!result.success || !result.data) {
		return (
			<div className="flex flex-col items-center justify-center h-full text-center p-8">
				<h2 className="text-2xl font-bold mb-2">Erro ao Buscar Favoritos</h2>
				<p className="text-muted-foreground">
					{result.error || "Não foi possível carregar suas receitas favoritas."}
				</p>
			</div>
		);
	}

	const favoriteRecipes = result.data;

	// Fetch unlocked recipes for the current user so we can show the correct lock status
	const { data: unlockedRecipes } = await getUnlockedRecipes();
	const unlockedIds = new Set(unlockedRecipes?.map((r) => r.id));

	return (
		<div className="container mx-auto py-10">
			<BackButton href="/dashboard" label="Voltar" />
			<h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
				Minhas Receitas Favoritas
			</h1>
			{favoriteRecipes.length > 0 ? (
				<RecipeList recipes={favoriteRecipes} unlockedRecipeIds={unlockedIds} />
			) : (
				<div className="flex flex-col items-center justify-center h-full text-center p-8 mt-8">
					<h2 className="text-2xl font-bold mb-2">Nenhuma Receita Favorita</h2>
					<p className="text-muted-foreground">
						Você ainda não favoritou nenhuma receita. Explore e encontre algumas
						que você ame!
					</p>
				</div>
			)}
		</div>
	);
}
