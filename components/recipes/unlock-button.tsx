"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { unlockRecipe } from "@/server/recipe";

interface UnlockButtonProps {
	recipeId: string;
	isUnlocked: boolean;
	userCredits: number;
}

export default function UnlockButton({
	recipeId,
	isUnlocked,
	userCredits,
}: UnlockButtonProps) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	if (isUnlocked) {
		return null;
	}

	const handleUnlock = () => {
		if (userCredits < 1) {
			router.push("/dashboard/more-credits");
			return;
		}

		startTransition(async () => {
			await unlockRecipe(recipeId);
		});
	};

	return (
		<Button
			onClick={handleUnlock}
			disabled={isPending}
			size="lg"
			className="w-full max-w-xs"
		>
			{isPending ? (
				<Loader2 className="mr-2 h-4 w-4 animate-spin" />
			) : userCredits < 1 ? (
				"Adquirir mais créditos"
			) : (
				`Desbloquear com 1 crédito (você tem ${userCredits})`
			)}
		</Button>
	);
}
