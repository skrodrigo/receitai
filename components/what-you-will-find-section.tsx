export default function WhatYouWillFindSection() {
	return (
		<section id="encontrar" className="py-16 bg-primary-foreground">
			<div className="container mx-auto px-4">
				<h3 className="text-3xl font-bold text-center text-primary mb-12">
					📝 O Que Você Vai Encontrar em Cada Receita?
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
					<div className="p-6 border border-border rounded-lg bg-muted">
						<h4 className="font-bold text-lg mb-2 text-muted-foreground	">
							Ingredientes e Preparo
						</h4>
						<p className="text-muted-foreground/70">
							Listas claras e passo a passo detalhado para não ter erro.
						</p>
					</div>
					<div className="p-6 border border-border rounded-lg bg-muted">
						<h4 className="font-bold text-lg mb-2 text-muted-foreground">
							Informações Nutricionais
						</h4>
						<p className="text-muted-foreground/70">
							Macros e calorias calculadas para sua dieta.
						</p>
					</div>
					<div className="p-6 border border-border rounded-lg bg-muted">
						<h4 className="font-bold text-lg text-muted-foreground">
							Dicas do Chef
						</h4>
						<p className="text-muted-foreground/70">
							Segredos para deixar seu prato ainda mais especial.
						</p>
					</div>
					<div className="p-6 border border-border rounded-lg bg-muted">
						<h4 className="font-bold text-lg text-muted-foreground">
							Técnicas Profissionais
						</h4>
						<p className="text-muted-foreground/70">
							Aprenda técnicas usadas em cozinhas renomadas.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
