import { Button } from "@/components/ui/button";
import { getUserSession, signOut } from "@/server/user";
import { ShoppingCart, SparkleIcon, Star, ChefHat } from "lucide-react";
import { Badge } from "./ui/badge";

export default async function DashboardHeader() {
  const session = await getUserSession();

  const credits = session?.data?.user?.credits || 0;

  return (
    <header className="sticky z-30 flex h-12 items-center gap-4 p-3 border-b border-border">
      <div className="flex flex-1 justify-start items-center space-x-2">

        <Button variant="outline">
        <ChefHat  className="ml-2 w-4"/>  
          Minhas Receitas          
        </Button>
        <Button variant="outline">
        <Star className="ml-2 w-4 fill-primary text-primary"/>
          Favoritos            
        </Button>
        <Button variant="outline">
        <Badge>Em breve</Badge>
          Receitas com IA       
        <SparkleIcon className="ml-2 w-4 fill-primary text-primary"/>

        </Button>
      </div>
      <div className="flex items-center gap-4">
          <div className="py-2 px-4 border rounded-lg bg-background">
            <p className="text-sm font-medium">
              Créditos: <span className="font-bold">{credits}</span>
            </p>
          </div>
        <Button><ShoppingCart /> Comprar Créditos</Button>
        <form action={signOut}>
          <Button type="submit" variant="outline">Sair</Button>
        </form>
      </div>
    </header>
  );
}
