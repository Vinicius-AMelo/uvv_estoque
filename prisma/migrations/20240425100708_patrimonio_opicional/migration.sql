-- AlterTable
ALTER TABLE "Estoque" ALTER COLUMN "product_code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RegistroEntradas" ALTER COLUMN "product_code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RegistroSaidas" ALTER COLUMN "product_code" DROP NOT NULL;
