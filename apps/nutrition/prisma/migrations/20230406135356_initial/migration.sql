/*
  Warnings:

  - A unique constraint covering the columns `[userId,type,createdAt]` on the table `Meal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Meal_userId_type_createdAt_key" ON "Meal"("userId", "type", "createdAt");
