-- CreateEnum
CREATE TYPE "PurchaseType" AS ENUM ('Membership', 'Workout');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('Visa', 'Mir', 'Umoney');

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "purchaseType" "PurchaseType" NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "payment" "PaymentMethod" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
