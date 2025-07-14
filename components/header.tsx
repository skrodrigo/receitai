import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
	return (
		<header className="top-2 border rounded-lg border-border bg-primary-foreground/95 backdrop-blur-sm sticky z-50 max-w-xl mx-auto">
			<div className="container mx-auto px-4 py-2 flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<Image
						src="/icon.png"
						alt="ReceitAI"
						priority
						quality={100}
						width={64}
						height={64}
						className="h-8 w-8 text-primary"
					/>
				</div>
				<nav className="hidden md:flex items-center space-x-6">
					<Link
						href="#receitas"
						className="text-foreground hover:text-primary font-medium"
					>
						Receitas
					</Link>
					<Link
						href="#precos"
						className="text-foreground hover:text-primary font-medium"
					>
						Preços
					</Link>
				</nav>
				<Button asChild className="bg-primary hover:bg-primary">
					<Link href="/register">Cadastro</Link>
				</Button>
			</div>
		</header>
	);
}
