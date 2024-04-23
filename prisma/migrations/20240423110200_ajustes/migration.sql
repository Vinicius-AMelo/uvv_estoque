/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `RegistroSaidas` table. All the data in the column will be lost.
  - You are about to drop the column `product_code` on the `RegistroSaidas` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `RegistroSaidas` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[estoqueId]` on the table `RegistroSaidas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `estoqueId` to the `RegistroSaidas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RegistroSaidas" DROP CONSTRAINT "RegistroSaidas_userId_fkey";

-- DropIndex
DROP INDEX "RegistroSaidas_userId_key";

-- AlterTable
ALTER TABLE "Estoque" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "RegistroEntradas" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "RegistroSaidas" DROP COLUMN "description",
DROP COLUMN "product_code",
DROP COLUMN "userId",
ADD COLUMN     "estoqueId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "estoqueId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "RegistroSaidas_estoqueId_key" ON "RegistroSaidas"("estoqueId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_estoqueId_fkey" FOREIGN KEY ("estoqueId") REFERENCES "Estoque"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroSaidas" ADD CONSTRAINT "RegistroSaidas_estoqueId_fkey" FOREIGN KEY ("estoqueId") REFERENCES "Estoque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
