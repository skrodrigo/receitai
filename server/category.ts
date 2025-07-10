"use server";

import prisma from "@/lib/prisma";

export async function GetCategories() {
	try {
		const categories = await prisma.category.findMany({
			orderBy: {
				name: "asc",
			},
		});
		return {
			success: true,
			data: categories,
			message: "Categorias obtidas com sucesso.",
		};
	} catch (_error) {
		return {
			success: false,
			error: "Ocorreu um erro ao buscar as categorias.",
		};
	}
}
