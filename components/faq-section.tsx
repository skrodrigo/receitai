import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
	return (
		<section id="faq" className="py-16">
			<div className="container mx-auto px-4 max-w-3xl">
				<h3 className="text-3xl font-bold text-center text-primary mb-12">
					Perguntas Frequentes
				</h3>
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger className="text-primary text-lg">
							Como funciona a compra de créditos?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground/70">
							Você adquire um pacote de créditos e pode usá-los para desbloquear
							as receitas que quiser, quando quiser. Seus créditos não expiram.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger className="text-primary text-lg">
							As receitas são para iniciantes?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground/70">
							Sim! Temos receitas para todos os níveis, desde o cozinheiro de
							primeira viagem até o chef experiente.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger className="text-primary text-lg">
							Posso acessar em qualquer dispositivo?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground/70">
							Com certeza! O ReceitAI é totalmente responsivo e pode ser
							acessado do seu celular, tablet ou computador.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</section>
	);
}
