/*
  Warnings:

  - You are about to drop the `WorkouLogEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "WorkouLogEntry";

-- CreateTable
CREATE TABLE "WorkoutLogEntry" (
    "id" SERIAL NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "WorkoutStatus" NOT NULL DEFAULT 'Active',
    "userId" TEXT NOT NULL,

    CONSTRAINT "WorkoutLogEntry_pkey" PRIMARY KEY ("id")
);
