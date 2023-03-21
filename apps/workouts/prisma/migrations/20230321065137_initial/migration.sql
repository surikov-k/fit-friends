/*
  Warnings:

  - Changed the type of `skill` on the `Workout` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Skill" AS ENUM ('Beginner', 'Amateur', 'Professional');

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "skill",
ADD COLUMN     "skill" "Skill" NOT NULL;
