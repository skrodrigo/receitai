import RecipeList from '@/components/recipes/recipe-list';
import DashboardHeader from "@/components/dashboard-header"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GetRecipes } from "@/server/recipe";

export default async function Page() {

  const { data: recipesList, error } = await GetRecipes();

  if (error) {
    return <div>Erro ao buscar receitas</div>
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <DashboardHeader />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pratos-principais">Pratos Principais</SelectItem>
            <SelectItem value="sobremesas">Sobremesas</SelectItem>
            <SelectItem value="lanches">Lanches</SelectItem>
            <SelectItem value="saladas">Saladas</SelectItem>
            <SelectItem value="sopas">Sopas</SelectItem>
          </SelectContent>
        </Select>
       {recipesList && <RecipeList recipes={recipesList} />}
      </main>
    </div>
  )
}
