import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MoreCreditsButton() {
	return (
		<Button asChild>
			<Link href="/dashboard/more-credits">
				<ShoppingCart />
				Mais Créditos
			</Link>
		</Button>
	);
}
