/*
  Warnings:

  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Rule" AS ENUM ('ADMIM', 'USER');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "rule" "Rule" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "Role";
