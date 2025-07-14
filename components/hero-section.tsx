import ViewRecipeButtonCTA from "./recipes/view-recipe-button-cta";

export default function HeroSection() {
	return (
		<section className="py-20 text-center">
			<div className="container mx-auto px-4">
				<h2 className="text-5xl font-extrabold text-primary mb-6 max-w-4xl mx-auto">
					Receitas Ricas em Proteina com ingredientes simples!
				</h2>
				<p className="text-md text-muted-foreground/70 mb-8 max-w-2xl mx-auto">
					Descubra receitas únicas criadas por nutricionistas renomados.
					Técnicas secretas, ingredientes especiais e resultados incríveis!
				</p>
				<ViewRecipeButtonCTA />
			</div>
		</section>
	);
}
