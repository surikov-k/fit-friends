-- CreateEnum
CREATE TYPE "WorkoutStatus" AS ENUM ('Active', 'Completed');

-- CreateTable
CREATE TABLE "WorkouLogEntry" (
    "id" SERIAL NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "WorkoutStatus" NOT NULL DEFAULT 'Active',
    "userId" TEXT NOT NULL,

    CONSTRAINT "WorkouLogEntry_pkey" PRIMARY KEY ("id")
);
