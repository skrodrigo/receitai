"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

interface BackButtonProps {
	href: string;
	label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
	return (
		<Button asChild variant="outline" className="mb-8">
			<Link href={href}>
				<ArrowLeft className="h-4 w-4 mr-2" />
				{label}
			</Link>
		</Button>
	);
}
