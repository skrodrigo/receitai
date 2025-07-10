"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/app/generated/prisma";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface CategoryFilterProps {
	categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleValueChange = (categoryId: string) => {
		const params = new URLSearchParams(searchParams);
		if (categoryId && categoryId !== "all") {
			params.set("categoryId", categoryId);
		} else {
			params.delete("categoryId");
		}
		router.replace(`${pathname}?${params.toString()}`);
	};

	const currentCategory = searchParams.get("categoryId") || "all";

	return (
		<Select onValueChange={handleValueChange} defaultValue={currentCategory}>
			<SelectTrigger className="w-full max-w-xs">
				<SelectValue placeholder="Filtrar por categoria" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">Todas as Categorias</SelectItem>
				{categories.map((category) => (
					<SelectItem key={category.id} value={category.id}>
						{category.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
