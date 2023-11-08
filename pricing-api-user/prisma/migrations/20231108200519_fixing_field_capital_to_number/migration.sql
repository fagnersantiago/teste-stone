/*
  Warnings:

  - Changed the type of `capital` on the `Insurance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Insurance" DROP COLUMN "capital",
ADD COLUMN     "capital" INTEGER NOT NULL;
