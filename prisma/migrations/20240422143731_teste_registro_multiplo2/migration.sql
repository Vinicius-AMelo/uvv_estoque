/*
  Warnings:

  - A unique constraint covering the columns `[estoqueId]` on the table `RegistroEntradas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `estoqueId` to the `RegistroEntradas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RegistroEntradas" ADD COLUMN     "estoqueId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RegistroEntradas_estoqueId_key" ON "RegistroEntradas"("estoqueId");

-- AddForeignKey
ALTER TABLE "RegistroEntradas" ADD CONSTRAINT "RegistroEntradas_estoqueId_fkey" FOREIGN KEY ("estoqueId") REFERENCES "Estoque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
