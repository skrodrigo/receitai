import LoginForm from "@/components/forms/login-form";

export default function LoginPage() {
	return (
		<div className="bg-background flex min-h-screen items-center justify-center">
			<div className="w-full max-w-sm">
				<LoginForm />
			</div>
		</div>
	);
}
