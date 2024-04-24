-- AlterTable
ALTER TABLE "Estoque" ADD COLUMN     "quantidade" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "RegistroEntradas" ADD COLUMN     "quantidade" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "RegistroSaidas" ADD COLUMN     "quantidade" INTEGER NOT NULL DEFAULT 0;
