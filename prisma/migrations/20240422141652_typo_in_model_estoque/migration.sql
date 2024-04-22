/*
  Warnings:

  - You are about to drop the column `produtc_code` on the `Estoque` table. All the data in the column will be lost.
  - Added the required column `product_code` to the `Estoque` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estoque" DROP COLUMN "produtc_code",
ADD COLUMN     "product_code" INTEGER NOT NULL;
