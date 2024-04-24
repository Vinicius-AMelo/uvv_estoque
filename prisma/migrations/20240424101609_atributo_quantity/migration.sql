/*
  Warnings:

  - You are about to drop the column `quantidade` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `RegistroEntradas` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `RegistroSaidas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Estoque" DROP COLUMN "quantidade",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "RegistroEntradas" DROP COLUMN "quantidade",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "RegistroSaidas" DROP COLUMN "quantidade",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;
