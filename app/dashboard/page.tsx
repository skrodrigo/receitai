import RecipeCard from "@/components/recipes/recipe-card"
import DashboardHeader from "@/components/dashboard-header"
 
export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <DashboardHeader />
        <RecipeCard />
      </main>
    </div>
  )
}
