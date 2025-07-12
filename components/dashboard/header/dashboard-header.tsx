import { ChefHat, Menu, SparkleIcon, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { getUserSession, signOut } from "@/server/user";
import { Badge } from "../../ui/badge";
import MoreCreditsButton from "./more-credits-button";

export default async function DashboardHeader() {
	const session = await getUserSession();
	const credits = session?.data?.user?.credits || 0;

	return (
		<header className="bg-background rounded-md sticky top-2 z-30 flex h-14 items-center gap-4 px-2">
			{/* Mobile Menu */}
			<div className="lg:hidden flex flex-1 items-center">
				<Sheet>
					<SheetTrigger asChild>
						<Button size="icon" variant="outline">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle Menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<SheetHeader>
							<SheetTitle>Menu</SheetTitle>
						</SheetHeader>
						<div className="grid gap-4 py-4">
							<Button variant="ghost" asChild className="justify-start">
								<Link href="/dashboard/my-recipes">
									<ChefHat className="mr-2 h-4 w-4" />
									Minhas Receitas
								</Link>
							</Button>
							<Button variant="ghost" asChild className="justify-start">
								<Link href="/dashboard/favorites">
									<Star className="mr-2 h-4 w-4" />
									Favoritos
								</Link>
							</Button>
							<Button variant="ghost" className="justify-start">
								<SparkleIcon className="mr-2 h-4 w-4" />
								Receitas com IA
								<Badge className="ml-auto">Em breve</Badge>
							</Button>
						</div>
						<div className="absolute bottom-4 left-4 right-4">
							<form action={signOut}>
								<Button type="submit" variant="outline" className="w-full">
									Sair
								</Button>
							</form>
						</div>
					</SheetContent>
				</Sheet>
			</div>

			{/* Desktop Menu */}
			<div className="hidden lg:flex flex-1 justify-start items-center space-x-2">
				<Button variant="outline" asChild>
					<Link href="/dashboard/my-recipes">
						<ChefHat className="mr-2 w-4 text-primary" />
						Minhas Receitas
					</Link>
				</Button>
				<Button variant="outline" asChild>
					<Link href="/dashboard/favorites">
						<Star className="mr-2 w-4 text-primary" />
						Favoritos
					</Link>
				</Button>
				<Button variant="outline">
					Receitas com IA
					<SparkleIcon className="ml-2 w-4 text-primary" />
					<Badge className="ml-2">Em breve</Badge>
				</Button>
			</div>

			{/* Common items */}
			<div className="flex items-center gap-4">
				<div className="py-2 px-4 border rounded-lg bg-background">
					<p className="text-sm font-medium">
						Créditos: <span className="font-bold">{credits}</span>
					</p>
				</div>
				<MoreCreditsButton />
				<form action={signOut} className="hidden lg:block">
					<Button type="submit" variant="outline">
						Sair
					</Button>
				</form>
			</div>
		</header>
	);
}
