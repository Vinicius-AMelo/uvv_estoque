/*
  Warnings:

  - A unique constraint covering the columns `[product_code]` on the table `Estoque` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Estoque_product_code_key" ON "Estoque"("product_code");
