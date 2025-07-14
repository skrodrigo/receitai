import Image from "next/image";
import ViewRecipeButtonCTA from "./recipes/view-recipe-button-cta";

export default function GuaranteeSection() {
	return (
		<section
			id="garantia"
			className="py-16 flex items-center container mx-auto px-4 text-center max-w-6xl"
		>
			<div className="flex items-start justify-start flex-col">
				<h3 className="text-3xl font-bold text-primary mb-4 text-left">
					Garantia de Satisfação Incondicional
				</h3>
				<p className="text-lg text-muted-foreground/70 mb-8 text-left">
					Se você não ficar totalmente satisfeito com nossas receitas,
					devolvemos seu dinheiro em até 7 dias. Sem perguntas, sem burocracia.
					O risco é todo nosso!
				</p>
				<ViewRecipeButtonCTA />
			</div>
			<Image src="/garantia.png" alt="" width={200} height={200} />
		</section>
	);
}
