import { ChefHat, SparkleIcon, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserSession, signOut } from "@/server/user";
import { Badge } from "../../ui/badge";
import MoreCreditsButton from "./more-credits-button";

export default async function DashboardHeader() {
	const session = await getUserSession();

	const credits = session?.data?.user?.credits || 0;

	return (
		<header className="sticky z-30 flex h-12 items-center gap-4 p-3 border-b border-border">
			<div className="flex flex-1 justify-start items-center space-x-2">
				<Button variant="outline" asChild>
					<Link href="/dashboard/my-recipes">
						<ChefHat className="ml-2 w-4" />
						Minhas Receitas
					</Link>
				</Button>
				<Button variant="outline" asChild>
					<Link href="/dashboard/favorites">
						<Star className="ml-2 w-4 fill-primary text-primary" />
						Favoritos
					</Link>
				</Button>
				<Button variant="outline">
					<Badge>Em breve</Badge>
					Receitas com IA
					<SparkleIcon className="ml-2 w-4 fill-primary text-primary" />
				</Button>
			</div>
			<div className="flex items-center gap-4">
				<div className="py-2 px-4 border rounded-lg bg-background">
					<p className="text-sm font-medium">
						Créditos: <span className="font-bold">{credits}</span>
					</p>
				</div>
				<MoreCreditsButton />
				<Button type="submit" variant="outline" onClick={signOut}>
					Sair
				</Button>
			</div>
		</header>
	);
}
