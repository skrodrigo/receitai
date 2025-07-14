import ViewRecipeButtonCTA from "./recipes/view-recipe-button-cta";

export default function GuaranteeSection() {
	return (
		<section id="garantia" className="py-16">
			<div className="container mx-auto px-4 text-center max-w-3xl">
				<h3 className="text-3xl font-bold text-primary mb-4">
					Garantia de Satisfação Incondicional
				</h3>
				<p className="text-lg text-muted-foreground/70 mb-8">
					Se você não ficar totalmente satisfeito com nossas receitas,
					devolvemos seu dinheiro em até 7 dias. Sem perguntas, sem burocracia.
					O risco é todo nosso!
				</p>
				<ViewRecipeButtonCTA />
			</div>
		</section>
	);
}
