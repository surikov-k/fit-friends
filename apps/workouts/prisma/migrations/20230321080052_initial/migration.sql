/*
  Warnings:

  - You are about to drop the column `authorId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Made the column `workoutId` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_workoutId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "authorId",
ADD COLUMN     "clientId" TEXT NOT NULL,
ALTER COLUMN "workoutId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
