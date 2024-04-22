/*
  Warnings:

  - You are about to drop the column `createdAt` on the `RegistroEntradas` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `RegistroEntradas` table. All the data in the column will be lost.
  - You are about to drop the column `product_code` on the `RegistroEntradas` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `RegistroEntradas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RegistroEntradas" DROP CONSTRAINT "RegistroEntradas_userId_fkey";

-- DropIndex
DROP INDEX "RegistroEntradas_userId_key";

-- AlterTable
ALTER TABLE "RegistroEntradas" DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "product_code",
DROP COLUMN "userId";
