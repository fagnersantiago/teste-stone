/*
  Warnings:

  - The values [ADMIM] on the enum `Rule` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Rule_new" AS ENUM ('ADMIN', 'USER');
ALTER TABLE "user" ALTER COLUMN "rule" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "rule" TYPE "Rule_new" USING ("rule"::text::"Rule_new");
ALTER TYPE "Rule" RENAME TO "Rule_old";
ALTER TYPE "Rule_new" RENAME TO "Rule";
DROP TYPE "Rule_old";
ALTER TABLE "user" ALTER COLUMN "rule" SET DEFAULT 'USER';
COMMIT;
