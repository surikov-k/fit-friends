-- CreateEnum
CREATE TYPE "Location" AS ENUM ('Pionerskaya', 'Petrogradskaya', 'Udelnaya', 'Zvezdnaya', 'Sportivnaya');

-- CreateEnum
CREATE TYPE "GymFeature" AS ENUM ('SwimmingPool', 'FreeParking', 'KidsRoom', 'Massage');

-- CreateTable
CREATE TABLE "Gym" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" "Location" NOT NULL,
    "isVerified" BOOLEAN NOT NULL,
    "features" "GymFeature"[],
    "photos" TEXT[],
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gym_pkey" PRIMARY KEY ("id")
);
