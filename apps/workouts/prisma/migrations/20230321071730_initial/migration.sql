/*
  Warnings:

  - You are about to drop the column `name` on the `Workout` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Workout` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - Added the required column `title` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Workout` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `Workout` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `duration` on the `Workout` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "WorkoutType" AS ENUM ('Yoga', 'Running', 'Boxing', 'Stretching', 'Crossfit', 'Aerobics', 'Pilates');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Common');

-- CreateEnum
CREATE TYPE "TimeSpan" AS ENUM ('Short', 'Normal', 'Long', 'Longest');

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "WorkoutType" NOT NULL,
ALTER COLUMN "price" SET DATA TYPE INTEGER,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL,
DROP COLUMN "duration",
ADD COLUMN     "duration" "TimeSpan" NOT NULL;
