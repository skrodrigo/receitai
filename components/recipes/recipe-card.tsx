"use client"

import React from 'react'
import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Clock, Lock, Star } from 'lucide-react'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { Button } from '../ui/button'
import { recipes } from './data-recipe'


export default function RecipeCard() {

  const [visibleRecipes, setVisibleRecipes] = useState(6)

  const showMoreRecipes = () => {
    setVisibleRecipes(visibleRecipes + 6)
  }

  const showLessRecipes = () => {
    setVisibleRecipes(6)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-6">
      {recipes.slice(0, visibleRecipes).map((recipe) => (
          <Card
            key={recipe.id}
            className="overflow-hidden border-2 border-primary hover:border-primary py-0 pb-4 transition-all duration-300 hover:shadow-xl bg-white/90 backdrop-blur-sm"
          >
            <div className="relative">
              <img
                src={recipe.image || "/placeholder.svg"}
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
                <Lock className="h-5 w-5 text-primary" />
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-primary/20 border-2 border-primary rounded-lg p-3 text-center">
                    <Lock className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-sm text-primary font-medium">Conteúdo Bloqueado</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary">
                <Link href="/login">🔓 Desbloquear Receita</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
     <div className="flex flex-col space-y-3 items-center justify-center">
     <Button onClick={showMoreRecipes} disabled={visibleRecipes >= recipes.length} className="w-full max-w-sm">Ver Mais Receitas</Button>
     <Button onClick={showLessRecipes} disabled={visibleRecipes <= 6} variant="outline" className="w-full max-w-sm">Ver Menos Receitas</Button>
     </div>
    </div>
  )
}
