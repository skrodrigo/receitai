import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Clock, Star } from 'lucide-react';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Button } from '../ui/button';
import type { Recipe } from '@/app/generated/prisma';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card
      key={recipe.id}
      className="overflow-hidden border border-primary hover:border-primary py-0 pb-4 transition-all duration-300 hover:shadow-xl bg-white/90 backdrop-blur-sm"
    >
      <div className="relative">
        <img
          src={recipe.image || '/placeholder.svg'}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-sm font-medium">
          <Star className="inline h-3 w-3 mr-1" />
          {recipe.rating}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-primary flex items-center justify-between">
          {recipe.title}
        </CardTitle>
        <div className="flex items-center space-x-4 text-sm text-primary">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {recipe.time}
          </div>
          <Badge variant="outline" className="border-primary text-primary">
            {recipe.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <p className="text-primary blur-sm select-none">{recipe.description}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-primary hover:bg-primary">
          <Link href="/login">🔓 Desbloquear Receita</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
