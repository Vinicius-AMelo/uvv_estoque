/*
  Warnings:

  - You are about to drop the column `estoqueId` on the `RegistroEntradas` table. All the data in the column will be lost.
  - You are about to drop the column `estoqueId` on the `RegistroSaidas` table. All the data in the column will be lost.
  - You are about to drop the column `estoqueId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_code]` on the table `RegistroEntradas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_code]` on the table `RegistroSaidas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `RegistroEntradas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_code` to the `RegistroEntradas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `RegistroEntradas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `RegistroSaidas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_code` to the `RegistroSaidas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `RegistroSaidas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RegistroEntradas" DROP CONSTRAINT "RegistroEntradas_estoqueId_fkey";

-- DropForeignKey
ALTER TABLE "RegistroSaidas" DROP CONSTRAINT "RegistroSaidas_estoqueId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_estoqueId_fkey";

-- DropIndex
DROP INDEX "RegistroEntradas_estoqueId_key";

-- DropIndex
DROP INDEX "RegistroSaidas_estoqueId_key";

-- AlterTable
ALTER TABLE "RegistroEntradas" DROP COLUMN "estoqueId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "product_code" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RegistroSaidas" DROP COLUMN "estoqueId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "product_code" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "estoqueId";

-- CreateIndex
CREATE UNIQUE INDEX "RegistroEntradas_product_code_key" ON "RegistroEntradas"("product_code");

-- CreateIndex
CREATE UNIQUE INDEX "RegistroSaidas_product_code_key" ON "RegistroSaidas"("product_code");

-- AddForeignKey
ALTER TABLE "RegistroEntradas" ADD CONSTRAINT "RegistroEntradas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroSaidas" ADD CONSTRAINT "RegistroSaidas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
