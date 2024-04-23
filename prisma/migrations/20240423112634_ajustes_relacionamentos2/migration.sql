-- AlterTable
ALTER TABLE "RegistroEntradas" ADD COLUMN     "estoqueId" INTEGER;

-- AlterTable
ALTER TABLE "RegistroSaidas" ADD COLUMN     "estoqueId" INTEGER;

-- AddForeignKey
ALTER TABLE "RegistroEntradas" ADD CONSTRAINT "RegistroEntradas_estoqueId_fkey" FOREIGN KEY ("estoqueId") REFERENCES "Estoque"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroSaidas" ADD CONSTRAINT "RegistroSaidas_estoqueId_fkey" FOREIGN KEY ("estoqueId") REFERENCES "Estoque"("id") ON DELETE SET NULL ON UPDATE CASCADE;
