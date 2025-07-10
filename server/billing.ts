"use server";

import { redirect } from "next/navigation";
import { OFFER_IDS } from "@/shared/offer-ids";

export const checkoutAction = async (credits: number) => {
	const offerId = OFFER_IDS[credits];
	if (!offerId) {
		return { success: false, error: "Pacote de créditos inválido." };
	}

	redirect(`https://pay.cakto.com.br/${offerId}`);
};

export const getOfferId = async (credits: number) => OFFER_IDS[credits];
