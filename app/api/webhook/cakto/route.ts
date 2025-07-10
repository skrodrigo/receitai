import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface CactoWebhookPayload {
	secret: string;
	event: string;
	data: {
		customer: {
			email: string;
		};
		offer: {
			id: string;
			name: string;
		};
		status: string;
	};
}

const CREDIT_PACKAGES: { [key: string]: number } = {
	v4gt8kp: 20, // 20 créditos
	c5b69kf: 40, // 40 créditos
	"36toabp": 250, // 250 créditos
};

export async function POST(req: Request) {
	console.log("Webhook da Cacto recebido!");

	try {
		const payload: CactoWebhookPayload = await req.json();
		const { secret, event, data } = payload;

		const cactoSecret = process.env.CAKTO_WEBHOOK_SECRET;
		if (!cactoSecret || secret !== cactoSecret) {
			console.warn("Segredo do webhook inválido ou não configurado.");
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		if (event === "purchase_approved" && data.status === "paid") {
			const userEmail = data.customer.email;
			const offerId = data.offer.id;

			const creditsToAdd = CREDIT_PACKAGES[offerId];

			if (!creditsToAdd) {
				console.warn(`Oferta com ID '${offerId}' não mapeada para créditos.`);
				return NextResponse.json({ success: true });
			}

			const user = await prisma.user.findUnique({
				where: { email: userEmail },
			});

			if (user) {
				await prisma.user.update({
					where: { id: user.id },
					data: {
						credits: {
							increment: creditsToAdd,
						},
					},
				});
				console.log(`Créditos adicionados para o usuário: ${userEmail}`);
			} else {
				console.warn(`Usuário com email '${userEmail}' não encontrado.`);
			}
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Erro ao processar o webhook da Cacto:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 200 },
		);
	}
}
