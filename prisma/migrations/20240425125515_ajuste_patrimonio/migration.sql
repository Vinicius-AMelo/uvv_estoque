/*
  Warnings:

  - Made the column `product_code` on table `Estoque` required. This step will fail if there are existing NULL values in that column.
  - Made the column `product_code` on table `RegistroEntradas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `product_code` on table `RegistroSaidas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "RegistroEntradas_product_code_key";

-- DropIndex
DROP INDEX "RegistroSaidas_product_code_key";

-- AlterTable
ALTER TABLE "Estoque" ALTER COLUMN "product_code" SET NOT NULL;

-- AlterTable
ALTER TABLE "RegistroEntradas" ALTER COLUMN "product_code" SET NOT NULL;

-- AlterTable
ALTER TABLE "RegistroSaidas" ALTER COLUMN "product_code" SET NOT NULL;
