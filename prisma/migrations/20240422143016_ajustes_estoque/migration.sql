/*
  Warnings:

  - You are about to drop the column `userId` on the `Estoque` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Estoque" DROP CONSTRAINT "Estoque_userId_fkey";

-- DropIndex
DROP INDEX "Estoque_userId_key";

-- AlterTable
ALTER TABLE "Estoque" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "RegistroEntradas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "product_code" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "RegistroEntradas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroSaidas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "product_code" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "RegistroSaidas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegistroEntradas_userId_key" ON "RegistroEntradas"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RegistroSaidas_userId_key" ON "RegistroSaidas"("userId");

-- AddForeignKey
ALTER TABLE "RegistroEntradas" ADD CONSTRAINT "RegistroEntradas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroSaidas" ADD CONSTRAINT "RegistroSaidas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
