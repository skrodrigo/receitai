"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { checkoutAction } from "@/server/billing";
import { signUp } from "@/server/user";

const formSchema = z.object({
	name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
	email: z.string().email("Email inválido."),
	password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

const plans = [
	{
		name: "Pacote Inicial",
		credits: 40,
		price: 20,
		popular: false,
		description: "Ideal para começar",
	},
	{
		name: "Pacote Intermediário",
		credits: 100,
		price: 35,
		popular: false,
		description: "Melhor custo-benefício",
	},
	{
		name: "Pacote Avançado",
		credits: 250,
		price: 50,
		popular: true,
		description: "Para chefs dedicados",
	},
];

export default function RegisterForm() {
	const _router = useRouter();
	const [step, setStep] = useState(1);
	const [selectedPlan, setSelectedPlan] = useState<number>(plans[1].credits);
	const [isSubmittingPlan, setIsSubmittingPlan] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const formData = new FormData();
		formData.append("name", values.name);
		formData.append("email", values.email);
		formData.append("password", values.password);

		const result = await signUp(null, formData);

		if (result.errors?.message) {
			form.setError("root.serverError", {
				message: result.errors.message.join(", "),
			});
		} else if (result.values) {
			setStep(4);
		}
	};

	const handleNextStep = async (field: "name" | "email") => {
		const isValid = await form.trigger(field);
		if (isValid) {
			setStep(step + 1);
		}
	};

	const handleCheckout = async () => {
		setIsSubmittingPlan(true);
		await checkoutAction(selectedPlan);
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<Card className="w-full min-w-[420px] bg-white/90 backdrop-blur-sm">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl text-foreground">
						{step === 4 ? "Escolha seu pacote" : "Seja bem-vindo! 👨‍🍳"}
					</CardTitle>
					<CardDescription className="text-foreground">
						{step === 4
							? "Selecione um pacote de créditos para começar."
							: "Crie sua conta para acessar receitas exclusivas"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{step < 4 ? (
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4"
							>
								{step === 1 && (
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-foreground">Nome</FormLabel>
												<FormControl>
													<Input
														placeholder="Seu nome"
														{...field}
														className="border-input placeholder:text-accent-foreground/60 focus:border-primary"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
								{step === 2 && (
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-foreground">Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="seu@email.com"
														{...field}
														className="border-input placeholder:text-accent-foreground/60 focus:border-primary"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
								{step === 3 && (
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-foreground">Senha</FormLabel>
												<FormControl>
													<Input
														type="password"
														placeholder="Sua senha"
														{...field}
														className="border-input placeholder:text-accent-foreground/60 focus:border-primary"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}

								{form.formState.errors.root?.serverError && (
									<p className="text-sm font-medium text-destructive">
										{form.formState.errors.root.serverError.message}
									</p>
								)}

								<div className="flex flex-col gap-2">
									{step === 1 && (
										<Button
											type="button"
											className="w-full bg-primary hover:bg-primary"
											onClick={() => handleNextStep("name")}
										>
											Continuar
										</Button>
									)}
									{step === 2 && (
										<>
											<Button
												type="button"
												className="w-full bg-primary hover:bg-primary"
												onClick={() => handleNextStep("email")}
											>
												Continuar
											</Button>
											<Button
												type="button"
												variant="outline"
												onClick={() => setStep(step - 1)}
											>
												Voltar
											</Button>
										</>
									)}
									{step === 3 && (
										<>
											<Button
												type="submit"
												className="w-full bg-primary hover:bg-primary"
												disabled={form.formState.isSubmitting}
											>
												{form.formState.isSubmitting
													? "Cadastrando..."
													: "Criar Conta"}
											</Button>
											<Button
												type="button"
												variant="outline"
												onClick={() => setStep(step - 1)}
											>
												Voltar
											</Button>
										</>
									)}
								</div>
							</form>
						</Form>
					) : (
						<div className="space-y-6">
							<RadioGroup
								defaultValue={String(selectedPlan)}
								onValueChange={(value) => setSelectedPlan(Number(value))}
								className="grid grid-cols-1 gap-4"
							>
								{plans.map((plan) => (
									<Label
										key={plan.credits}
										htmlFor={String(plan.credits)}
										className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
											selectedPlan === plan.credits
												? "border-primary bg-primary/10"
												: "border-border"
										}`}
									>
										<div className="flex items-center justify-between w-full">
											<div className="flex items-center">
												<RadioGroupItem
													value={String(plan.credits)}
													id={String(plan.credits)}
												/>
												<div className="flex flex-col ml-1">
													<p className="font-semibold">{plan.name}</p>
													<p className="text-sm text-muted-foreground">
														{plan.description}
													</p>
												</div>
											</div>
											<p className="font-bold text-lg">R${plan.price}</p>
										</div>
									</Label>
								))}
							</RadioGroup>
							<Button
								onClick={handleCheckout}
								className="w-full bg-primary hover:bg-primary"
								disabled={isSubmittingPlan}
							>
								{isSubmittingPlan ? "Processando..." : "Adquirir Créditos"}
							</Button>
						</div>
					)}

					<div className="mt-4 text-center text-sm">
						Já tem uma conta?{" "}
						<Link href="/login" className="underline">
							Login
						</Link>
					</div>
					<div className="pt-4">
						<Link
							href="/"
							className="text-sm text-primary hover:text-primary flex items-center justify-center"
						>
							Voltar para o início
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
