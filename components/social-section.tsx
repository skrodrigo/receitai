"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function SocialSection() {
	return (
		<section id="provas-sociais" className="py-16 bg-primary-foreground">
			<div className="container mx-auto px-4">
				<h3 className="text-3xl font-bold text-center text-primary mb-12">
					💬 O Que Nossos Chefs Estão Dizendo
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<Card className="border-border bg-muted">
						<CardContent className="pt-6">
							<p className="text-muted-foreground italic">
								"As receitas são incríveis e fáceis de seguir. Mudei
								completamente minha alimentação!"
							</p>
							<p className="text-right text-muted-foreground mt-4">- João P.</p>
						</CardContent>
					</Card>
					<Card className="border-border bg-muted">
						<CardContent className="pt-6">
							<p className="text-muted-foreground italic">
								"Finalmente encontrei receitas proteicas que são deliciosas.
								Recomendo!"
							</p>
							<p className="text-right text-muted-foreground mt-4">
								- Maria S.
							</p>
						</CardContent>
					</Card>
					<Card className="border-border bg-muted">
						<CardContent className="pt-6">
							<p className="text-muted-foreground italic">
								"A variedade de pratos é impressionante. Todo dia uma nova
								descoberta."
							</p>
							<p className="text-right text-muted-foreground mt-4">
								- Carlos F.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
