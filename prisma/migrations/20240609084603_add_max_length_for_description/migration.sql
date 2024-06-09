/*
  Warnings:

  - You are about to alter the column `description` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" SET DATA TYPE VARCHAR(150);
