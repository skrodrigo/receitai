import RecipeCard from "@/components/recipes/recipe-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Star, Users, Utensils } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {

  const pricingPlans = [
    {
      credits: 20,
      price: 20,
      popular: false,
      description: "Ideal para começar",
    },
    {
      credits: 100,
      price: 60,
      popular: true,
      description: "Para chefs dedicados",
    },
    {
      credits: 50,
      price: 40,
      popular: false,
      description: "Melhor custo-benefício",
    },

  ]


  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <header className="top-2 border rounded-lg border-primary bg-primary-foreground/95 backdrop-blur-sm sticky top-0 z-50 max-w-xl mx-auto">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/icon.svg" alt="ReceitAI" width={32} height={32} className="h-8 w-8 text-primary" />
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#receitas" className="text-primary hover:text-primary font-medium">
              Receitas
            </Link>
            <Link href="#precos" className="text-primary hover:text-primary font-medium">
              Preços
            </Link>
          </nav>
          <Button asChild className="bg-primary hover:bg-primary">
            <Link href="/login">Fazer Login</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-primary mb-6">🍳 Receitas Ricas em Proteina com ingredientes simples!</h2>
          <p className="text-md text-primary mb-8 max-w-2xl mx-auto">
            Descubra receitas únicas criadas por nutricionistas renomados. Técnicas secretas, ingredientes especiais e
            resultados incríveis!
          </p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary text-lg px-8 py-3">
            <Link href="#receitas">Ver Receitas 👨‍🍳</Link>
          </Button>
        </div>
      </section>

      {/* Recipes Section */}
      <section id="receitas" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-primary mb-12">🔥 Receitas Premium Exclusivas</h3>
            <RecipeCard />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-16 ">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-primary mb-4">💳 Planos de Créditos</h3>
          <p className="text-center text-primary mb-12 text-lg">
            Escolha o plano ideal para suas aventuras culinárias
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? "border-primary bg-primary-foreground scale-105"
                    : "border-primary bg-white hover:border-primary"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white px-4 py-1">⭐⭐⭐⭐⭐ Mais Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <div className="text-4xl mb-2">{plan.credits === 20 ? "🥉" : plan.credits === 50 ? "🥈" : "🥇"}</div>
                  <CardTitle className="text-2xl text-primary">{plan.credits} Créditos</CardTitle>
                  <CardDescription className="text-primary">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-extrabold text-primary mb-2 ">R$ {plan.price}</div>
                  <p className="text-primary text-sm mb-4">R$ {(plan.price / plan.credits).toFixed(2)} por receita</p>
                  <div className="space-y-2 text-sm text-primary">
                    <div className="flex items-center justify-center">
                      <Utensils className="h-4 w-4 mr-2" />
                      {plan.credits} receitas premium
                    </div>
                    <div className="flex items-center justify-center">
                      <Users className="h-4 w-4 mr-2" />
                      Suporte prioritário
                    </div>
                    <div className="flex items-center justify-center">
                      <Star className="h-4 w-4 mr-2" />
                      Acesso vitalício
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-primary hover:bg-primary" : "bg-primary hover:bg-primary"
                    }`}
                  >
                    🛒 Adquirir Agora
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ChefHat className="h-6 w-6" />
                <h4 className="text-xl font-bold">ReceitAI</h4>
              </div>
              <p className="text-primary-foreground">
                Revolucionando a culinária com nutricionistas renomados. Receitas únicas para chefs apaixonados.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Produto</h5>
              <ul className="space-y-2 text-primary-foreground">
                <li>
                  <Link href="#receitas" className="hover:text-white">
                    Receitas
                  </Link>
                </li>
                <li>
                  <Link href="#precos" className="hover:text-white">
                    Preços
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Suporte</h5>
              <ul className="space-y-2 text-primary-foreground">
                <li>
                  <Link href="#" className="hover:text-white">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-primary-foreground">
                <li>
                  <Link href="#" className="hover:text-white">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary mt-8 pt-8 text-center text-primary-foreground">
            <p>&copy; 2024 ReceitAI. Todos os direitos reservados. Feito com 💚 para chefs apaixonados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
