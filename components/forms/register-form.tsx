import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function RegisterForm() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md  bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary">Seja um bem-vindo! 👨‍🍳</CardTitle>
          <CardDescription className="text-primary">
            Entre na sua conta para acessar receitas exclusivas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            <Image src="https://www.svgrepo.com/show/353817/google-icon.svg" alt="Google" width={16} height={16} />

            Cadastrar com Google
          </Button>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-primary">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="border-primary focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-primary">
              Senha
            </Label>
            <Input id="password" type="password" className="border-primary focus:border-primary" />
          </div>
          <Button className="w-full bg-primary hover:bg-primary">🔓 Cadastrar</Button>
          <div className="text-center space-y-2">
            <Link href="#" className="text-sm text-primary hover:text-primary">
              Esqueceu sua senha?
            </Link>
            <p className="text-sm text-primary">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-primary hover:text-primary font-medium">
                Login
              </Link>
            </p>
          </div>
          <div className="pt-4">
            <Link href="/" className="text-sm text-primary hover:text-primary flex items-center justify-center">
              ← Voltar para o início
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
