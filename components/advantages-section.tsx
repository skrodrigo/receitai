export default function AdvantagesSection() {
	return (
		<section id="vantagens" className="py-16">
			<div className="container mx-auto px-4">
				<h3 className="text-3xl font-bold text-center text-primary mb-12">
					✅ Vantagens de Usar o ReceitAI
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
					<div className="p-6">
						<h4 className="font-bold text-lg text-destructive mb-2">
							Economia de Tempo
						</h4>
						<p className="text-muted-foreground/70">
							Planeje suas refeições de forma rápida e eficiente.
						</p>
					</div>
					<div className="p-6">
						<h4 className="font-bold text-lg text-destructive mb-2">
							Receitas Aprovadas
						</h4>
						<p className="text-muted-foreground/70">
							Criadas e validadas por nutricionistas experientes.
						</p>
					</div>
					<div className="p-6">
						<h4 className="font-bold text-lg text-destructive mb-2">
							Vida Saudável
						</h4>
						<p className="text-muted-foreground/70">
							Alcance seus objetivos com uma alimentação balanceada.
						</p>
					</div>
					<div className="p-6">
						<h4 className="font-bold text-lg text-destructive mb-2">
							Novos Sabores
						</h4>
						<p className="text-muted-foreground/70">
							Descubra ingredientes e pratos que vão te surpreender.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
