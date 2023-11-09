/*
  Warnings:

  - A unique constraint covering the columns `[coverageId]` on the table `coverage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "coverage_coverageId_key" ON "coverage"("coverageId");
