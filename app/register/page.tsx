import RegisterForm from "@/components/forms/register-form"

export default function RegisterPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  )
}
