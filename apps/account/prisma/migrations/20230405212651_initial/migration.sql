-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('Breakfast', 'Launch', 'Dinner', 'Snack');

-- CreateTable
CREATE TABLE "Meal" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "MealType" NOT NULL,
    "calories" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);
