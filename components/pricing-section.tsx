import { Star, Users, Utensils } from "lucide-react";
import Link from "next/link";
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

interface PricingPlan {
	credits: number;
	price: number;
	popular: boolean;
	description: string;
}

const pricingPlans: PricingPlan[] = [
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

export default function PricingSection() {
	return (
		<div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto py-16">
			{pricingPlans.map((plan) => (
				<Card
					key={plan.price}
					className={`relative border transition-all duration-300 hover:shadow-xl ${
						plan.popular
							? "border-border bg-primary-foreground scale-105"
							: "border-border bg-white hover:border-border"
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
							{plan.credits === 40 ? "🥉" : plan.credits === 250 ? "🥇" : "🥈"}
						</div>
						<CardTitle className="text-2xl text-muted-foreground">
							{plan.credits} Créditos
						</CardTitle>
						<CardDescription className="text-muted-foreground/70">
							{plan.description}
						</CardDescription>
					</CardHeader>
					<CardContent className="text-center">
						<div className="text-5xl font-bold text-primary mb-2">
							R$ {plan.price}
						</div>
						<p className="text-muted-foreground/70 text-sm mb-4">
							R$ {(plan.price / plan.credits).toFixed(2)} por receita
						</p>
						<div className="space-y-2 text-sm text-muted-foreground">
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
						<Link href="/dashboard/more-credits" className="w-full">
							<Button className="w-full bg-primary hover:bg-primary">
								🛒 Adquirir Agora
							</Button>
						</Link>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
