import { PrismaClient } from '../app/generated/prisma';
import { recipes as mockRecipes } from '../components/recipes/data-recipe';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  await prisma.recipe.deleteMany({});
  await prisma.category.deleteMany({});
  console.log('Cleaned up previous data.');

  const categoriesData = [
    { name: 'Pratos Principais' },
    { name: 'Sobremesas' },
    { name: 'Lanches' },
    { name: 'Saladas' },
    { name: 'Sopas' },
  ];

  await prisma.category.createMany({
    data: categoriesData,
  });
  console.log('Created categories.');

  const categories = await prisma.category.findMany();

  for (const recipe of mockRecipes) {
    await prisma.recipe.create({
      data: {
        title: recipe.title,
        description: recipe.description,
        image: recipe.image,
        time: recipe.time,
        difficulty: recipe.difficulty,
        rating: recipe.rating,
        isPublic: true,
        ingredients: {
          items: [
            '1 xícara de ingrediente A',
            '2 colheres de sopa de ingrediente B',
            '3 unidades de ingrediente C',
            'Sal e pimenta a gosto',
          ],
        },
        instructions: {
          steps: [
            'Passo 1: Misture os ingredientes secos.',
            'Passo 2: Adicione os ingredientes molhados.',
            'Passo 3: Asse por 20 minutos a 180°C.',
            'Passo 4: Sirva quente.',
          ],
        },
        categoryId: categories[Math.floor(Math.random() * categories.length)].id,
      },
    });
  }
  console.log(`Created ${mockRecipes.length} recipes.`);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
