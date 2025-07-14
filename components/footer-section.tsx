import { ChefHat } from "lucide-react";
import Link from "next/link";

export default function FooterSection() {
	return (
		<footer className="bg-primary text-white py-12">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<div className="flex items-center space-x-2 mb-4">
							<ChefHat className="h-6 w-6" />
							<h4 className="text-xl font-bold">ReceitAI</h4>
						</div>
						<p className="text-primary-foreground">
							Revolucionando a culinária com nutricionistas renomados. Receitas
							únicas para chefs apaixonados.
						</p>
					</div>
					<div>
						<h5 className="font-semibold mb-4">Produto</h5>
						<ul className="space-y-2 text-primary-foreground">
							<li>
								<Link href="#receitas" className="hover:text-white">
									Receitas
								</Link>
							</li>
							<li>
								<Link href="#precos" className="hover:text-white">
									Preços
								</Link>
							</li>
							<li>
								<Link href="/login" className="hover:text-white">
									Login
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h5 className="font-semibold mb-4">Suporte</h5>
						<ul className="space-y-2 text-primary-foreground">
							<li>
								<Link href="#" className="hover:text-white">
									Central de Ajuda
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-white">
									Contato
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-white">
									FAQ
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h5 className="font-semibold mb-4">Legal</h5>
						<ul className="space-y-2 text-primary-foreground">
							<li>
								<Link href="#" className="hover:text-white">
									Termos de Uso
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-white">
									Privacidade
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-white">
									Cookies
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="border-t border-border mt-8 pt-8 text-center text-primary-foreground">
					<p>
						&copy; 2024 ReceitAI. Todos os direitos reservados. Feito com 🧡
						para chefs apaixonados.
					</p>
				</div>
			</div>
		</footer>
	);
}
