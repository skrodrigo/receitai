import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserSession, signOut } from "@/server/user";

export default async function DashboardHeader() {
  const session = await getUserSession();

  // const credits = session?.user?.credits || 0;

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="flex-1">
      </div>
      <div className="flex items-center gap-4">
        <Card>
          <CardContent className="p-2">
            <p className="text-sm font-medium">
              Créditos: <span className="font-bold">5</span>
            </p>
          </CardContent>
        </Card>
        <Button>Comprar Créditos</Button>
        <form action={signOut}>
          <Button type="submit" variant="outline">Sair</Button>
        </form>
      </div>
    </header>
  );
}
