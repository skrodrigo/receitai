import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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
      credits: 40,
      price: 20,
      popular: false,
      description: "Ideal para começar",
    },
    {
      credits: 250,
      price: 50,
      popular: true,
      description: "Para chefs dedicados",
    },
    {
      credits: 100,
      price: 35,
      popular: false,
      description: "Melhor custo-benefício",
    },

  ]


  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <header className="top-2 border rounded-lg border-primary bg-primary-foreground/95 backdrop-blur-sm sticky top-0 z-50 max-w-xl mx-auto">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
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
                className={`relative border transition-all duration-300 hover:shadow-xl ${
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

      {/* What you will find Section */}
      <section id="encontrar" className="py-16 bg-primary-foreground">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-primary mb-12">📝 O Que Você Vai Encontrar em Cada Receita?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 border border-primary rounded-lg">
              <h4 className="font-bold text-lg text-primary mb-2">Ingredientes e Preparo</h4>
              <p className="text-primary">Listas claras e passo a passo detalhado para não ter erro.</p>
            </div>
            <div className="p-6 border border-primary rounded-lg">
              <h4 className="font-bold text-lg text-primary mb-2">Informações Nutricionais</h4>
              <p className="text-primary">Macros e calorias calculadas para sua dieta.</p>
            </div>
            <div className="p-6 border border-primary rounded-lg">
              <h4 className="font-bold text-lg text-primary mb-2">Dicas do Chef</h4>
              <p className="text-primary">Segredos para deixar seu prato ainda mais especial.</p>
            </div>
            <div className="p-6 border border-primary rounded-lg">
              <h4 className="font-bold text-lg text-primary mb-2">Técnicas Profissionais</h4>
              <p className="text-primary">Aprenda técnicas usadas em cozinhas renomadas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="vantagens" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-primary mb-12">✅ Vantagens de Usar o ReceitAI</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <h4 className="font-bold text-lg text-primary mb-2">Economia de Tempo</h4>
              <p className="text-primary">Planeje suas refeições de forma rápida e eficiente.</p>
            </div>
            <div className="p-6">
              <h4 className="font-bold text-lg text-primary mb-2">Receitas Aprovadas</h4>
              <p className="text-primary">Criadas e validadas por nutricionistas experientes.</p>
            </div>
            <div className="p-6">
              <h4 className="font-bold text-lg text-primary mb-2">Vida Saudável</h4>
              <p className="text-primary">Alcance seus objetivos com uma alimentação balanceada.</p>
            </div>
            <div className="p-6">
              <h4 className="font-bold text-lg text-primary mb-2">Novos Sabores</h4>
              <p className="text-primary">Descubra ingredientes e pratos que vão te surpreender.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="provas-sociais" className="py-16 bg-primary-foreground">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-primary mb-12">💬 O Que Nossos Chefs Estão Dizendo</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-primary">
              <CardContent className="pt-6">
                <p className="text-primary italic">"As receitas são incríveis e fáceis de seguir. Mudei completamente minha alimentação!"</p>
                <p className="text-right font-bold text-primary mt-4">- João P.</p>
              </CardContent>
            </Card>
            <Card className="border-primary">
              <CardContent className="pt-6">
                <p className="text-primary italic">"Finalmente encontrei receitas proteicas que são deliciosas. Recomendo!"</p>
                <p className="text-right font-bold text-primary mt-4">- Maria S.</p>
              </CardContent>
            </Card>
            <Card className="border-primary">
              <CardContent className="pt-6">
                <p className="text-primary italic">"A variedade de pratos é impressionante. Todo dia uma nova descoberta."</p>
                <p className="text-right font-bold text-primary mt-4">- Carlos F.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objections Section */}
      <section id="objecoes" className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h3 className="text-3xl font-bold text-center text-primary mb-12">💡 Ainda na Dúvida?</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-lg text-primary">"Não tenho tempo para cozinhar."</h4>
              <p className="text-primary">Nossas receitas são pensadas para serem rápidas e práticas, se encaixando na sua rotina.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg text-primary">"É muito caro."</h4>
              <p className="text-primary">Com nossos planos, cada receita custa menos que um café. É um investimento na sua saúde.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg text-primary">"Não vou conseguir seguir as receitas."</h4>
              <p className="text-primary">O passo a passo é super detalhado e simples. Qualquer um pode se tornar um chef!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section id="garantia" className="py-16 bg-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h3 className="text-3xl font-bold text-primary mb-4">🛡️ Garantia de Satisfação Incondicional</h3>
          <p className="text-lg text-primary mb-8">Se você não ficar totalmente satisfeito com nossas receitas, devolvemos seu dinheiro em até 7 dias. Sem perguntas, sem burocracia. O risco é todo nosso!</p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary text-lg px-8 py-3">
            <Link href="#precos">Quero Começar Sem Risco</Link>
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h3 className="text-3xl font-bold text-center text-primary mb-12">🤔 Perguntas Frequentes</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-primary text-lg">💰 Como funciona a compra de créditos?</AccordionTrigger>
              <AccordionContent className="text-primary">
                Você adquire um pacote de créditos e pode usá-los para desbloquear as receitas que quiser, quando quiser. Seus créditos não expiram.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-primary text-lg">🧑‍🍳 As receitas são para iniciantes?</AccordionTrigger>
              <AccordionContent className="text-primary">
                Sim! Temos receitas para todos os níveis, desde o cozinheiro de primeira viagem até o chef experiente.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-primary text-lg">📱 Posso acessar em qualquer dispositivo?</AccordionTrigger>
              <AccordionContent className="text-primary">
                Com certeza! O ReceitAI é totalmente responsivo e pode ser acessado do seu celular, tablet ou computador.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
            <p>&copy; 2024 ReceitAI. Todos os direitos reservados. Feito com 🧡 para chefs apaixonados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
