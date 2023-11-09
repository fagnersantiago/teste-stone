/*
  Warnings:

  - You are about to drop the `_IsuranceToOccupation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_IsuranceToOccupation" DROP CONSTRAINT "_IsuranceToOccupation_A_fkey";

-- DropForeignKey
ALTER TABLE "_IsuranceToOccupation" DROP CONSTRAINT "_IsuranceToOccupation_B_fkey";

-- DropTable
DROP TABLE "_IsuranceToOccupation";

-- CreateTable
CREATE TABLE "_InsuranceToOccupation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InsuranceToOccupation_AB_unique" ON "_InsuranceToOccupation"("A", "B");

-- CreateIndex
CREATE INDEX "_InsuranceToOccupation_B_index" ON "_InsuranceToOccupation"("B");

-- AddForeignKey
ALTER TABLE "_InsuranceToOccupation" ADD CONSTRAINT "_InsuranceToOccupation_A_fkey" FOREIGN KEY ("A") REFERENCES "Insurance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InsuranceToOccupation" ADD CONSTRAINT "_InsuranceToOccupation_B_fkey" FOREIGN KEY ("B") REFERENCES "occupation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
