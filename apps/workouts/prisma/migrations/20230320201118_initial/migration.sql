-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "calories" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL,
    "coachId" TEXT NOT NULL,
    "isSpecialOffer" BOOLEAN NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);
