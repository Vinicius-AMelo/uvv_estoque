-- DropIndex
DROP INDEX "Estoque_product_code_key";

-- AlterTable
ALTER TABLE "Estoque" ALTER COLUMN "product_code" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "RegistroEntradas" ALTER COLUMN "product_code" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "RegistroSaidas" ALTER COLUMN "product_code" SET DEFAULT 0;
