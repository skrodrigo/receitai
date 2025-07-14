"use client";

import { Star, Users, Utensils } from "lucide-react";
import Link from "next/link";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { checkoutAction } from "@/server/billing";

type CheckoutAction = (formData: FormData) => void | Promise<void>;

const createCheckoutAction =
	(credits: number): CheckoutAction =>
	async () => {
		await checkoutAction(credits);
	};

const pricingPlans = [
	{
		credits: 40,
		price: 20,
		popular: false,
		description: "Ideal para começar",
	},
	{
		credits: 250,
		price: 50,
		popular: true,
		description: "Para chefs dedicados",
	},
	{
		credits: 100,
		price: 35,
		popular: false,
		description: "Melhor custo-benefício",
	},
];

export default function MoreCredits() {
	return (
		<>
			<section className="py-16">
				<div className="container mx-auto px-4">
					<h3 className="text-3xl font-bold text-center text-primary mb-4">
						💳 Planos de Créditos
					</h3>
					<p className="text-center text-primary mb-12 text-lg">
						Escolha o plano ideal para suas aventuras culinárias
					</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto justify-center items-center">
						{pricingPlans.map((plan, _index) => (
							<Card
								key={plan.price}
								className={`relative border transition-all duration-300 hover:shadow-xl ${
									plan.popular
										? "border-primary bg-primary-foreground scale-105"
										: "border-primary bg-white hover:border-primary"
								}`}
							>
								{plan.popular && (
									<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
										<Badge className="bg-primary text-white px-4 py-1">
											⭐⭐⭐⭐⭐ Mais Popular
										</Badge>
									</div>
								)}
								<CardHeader className="text-center pb-2">
									<div className="text-4xl mb-2">
										{plan.credits === 20
											? "🥉"
											: plan.credits === 50
												? "🥈"
												: "🥇"}
									</div>
									<CardTitle className="text-2xl text-primary">
										{plan.credits} Créditos
									</CardTitle>
									<CardDescription className="text-primary">
										{plan.description}
									</CardDescription>
								</CardHeader>
								<CardContent className="text-center">
									<div className="text-4xl font-extrabold text-primary mb-2 ">
										R$ {plan.price}
									</div>
									<p className="text-primary text-sm mb-4">
										R$ {(plan.price / plan.credits).toFixed(2)} por receita
									</p>
									<div className="space-y-2 text-sm text-primary">
										<div className="flex items-center justify-center">
											<Utensils className="h-4 w-4 mr-2" />
											{plan.credits} receitas premium
										</div>
										<div className="flex items-center justify-center">
											<Users className="h-4 w-4 mr-2" />
											Suporte prioritário
										</div>
										<div className="flex items-center justify-center">
											<Star className="h-4 w-4 mr-2" />
											Acesso vitalício
										</div>
									</div>
								</CardContent>
								<CardFooter>
									<form
										action={createCheckoutAction(plan.credits)}
										className="w-full"
									>
										<Button
											className="w-full bg-primary hover:bg-primary"
											type="submit"
										>
											Agora
										</Button>
									</form>
								</CardFooter>
							</Card>
						))}
					</div>
					<Link
						href="/dashboard"
						className="text-primary underline cursor-pointer flex justify-center items-center mt-8"
					>
						Voltar para a página inicial
					</Link>
				</div>
			</section>

			<section id="garantia" className="py-16 bg-primary-foreground">
				<div className="container mx-auto px-4 text-center max-w-3xl">
					<h3 className="text-3xl font-bold text-primary mb-4">
						🛡️ Garantia de Satisfação Incondicional
					</h3>
					<p className="text-lg text-primary mb-8">
						Se você não ficar totalmente satisfeito com nossas receitas,
						devolvemos seu dinheiro em até 7 dias. Sem perguntas, sem
						burocracia. O risco é todo nosso!
					</p>
					<Button
						size="lg"
						asChild
						className="bg-primary hover:bg-primary text-lg px-8 py-3"
					>
						<Link href="#precos">Quero Começar Sem Risco</Link>
					</Button>
				</div>
			</section>

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
							<AccordionContent className="text-primary">
								Você adquire um pacote de créditos e pode usá-los para
								desbloquear as receitas que quiser, quando quiser. Seus créditos
								não expiram.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger className="text-primary text-lg">
								As receitas são para iniciantes?
							</AccordionTrigger>
							<AccordionContent className="text-primary">
								Sim! Temos receitas para todos os níveis, desde o cozinheiro de
								primeira viagem até o chef experiente.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger className="text-primary text-lg">
								Posso acessar em qualquer dispositivo?
							</AccordionTrigger>
							<AccordionContent className="text-primary">
								Com certeza! O ReceitAI é totalmente responsivo e pode ser
								acessado do seu celular, tablet ou computador.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</section>
		</>
	);
}
