"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";

export default function ViewRecipeButtonCTA() {
	return (
		<motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
			<Button
				size="lg"
				asChild
				className="bg-primary hover:bg-primary text-lg px-8 py-3"
			>
				<Link href="#receitas">Ver Receitas 👨‍🍳</Link>
			</Button>
		</motion.div>
	);
}
