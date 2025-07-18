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
import { signIn } from "@/server/user";

const formSchema = z.object({
	email: z.string().email("Email inválido."),
	password: z.string().min(1, "A senha é obrigatória."),
});

export default function LoginForm() {
	const router = useRouter();
	const [step, setStep] = useState(1);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const formData = new FormData();
		formData.append("email", values.email);
		formData.append("password", values.password);

		const result = await signIn(null, formData);

		if (result.errors?.message) {
			form.setError("root.serverError", {
				message: result.errors.message.join(", "),
			});
		} else if (result.redirect) {
			router.push(result.redirect);
		}
	};

	// const signInWithGoogle = async () => {
	// 	await_signInWithGoogleIn.social({
	// 		provider: "google",
	// 		callbackURL: "/dashboard/more-credits",
	// 	});
	// };

	const handleNextStep = async () => {
		const isValid = await form.trigger("email");
		if (isValid) {
			setStep(2);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<Card className="w-full min-w-[420px] bg-white/90 backdrop-blur-sm">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl text-foreground">
						Bem-vindo de volta! 👨‍🍳
					</CardTitle>
					<CardDescription className="text-foreground">
						Entre na sua conta para acessar receitas exclusivas
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							{step === 1 && (
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
							{step === 2 && (
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
										onClick={handleNextStep}
									>
										Continuar
									</Button>
								)}
								{step === 2 && (
									<>
										<Button
											type="submit"
											className="w-full bg-primary hover:bg-primary"
											disabled={form.formState.isSubmitting}
										>
											{form.formState.isSubmitting ? "Entrando..." : "Entrar"}
										</Button>
										<Button
											type="button"
											variant="outline"
											onClick={() => setStep(1)}
										>
											Voltar
										</Button>
									</>
								)}
							</div>
						</form>
					</Form>
					{/* {step === 1 && (
						<>
							<div className="relative my-4">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-card px-2 text-muted-foreground">
										Ou continue com
									</span>
								</div>
							</div>
							<Button
								variant="outline"
								className="w-full"
								onClick={signInWithGoogle}
							>
								<Image
									src="https://www.svgrepo.com/show/353817/google-icon.svg"
									alt="Google"
									width={16}
									height={16}
									className="mr-2"
								/>
								Entrar com Google
							</Button>
						</>
					)} */}
					<div className="mt-4 text-center text-sm">
						Não tem uma conta?{" "}
						<Link href="/register" className="underline">
							Cadastre-se
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
