/*
  Warnings:

  - You are about to alter the column `rating` on the `Workout` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Workout" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;
