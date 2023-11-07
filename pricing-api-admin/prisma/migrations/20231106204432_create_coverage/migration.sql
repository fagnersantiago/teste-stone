-- CreateTable
CREATE TABLE "coverage" (
    "coverageId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "capital" TEXT NOT NULL,
    "premium" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "coverage_coverageId_key" ON "coverage"("coverageId");
