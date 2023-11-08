-- CreateTable
CREATE TABLE "AgeFactor" (
    "id" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "factor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AgeFactor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "occupation" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "factor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "occupation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insurance" (
    "id" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "occupationCode" TEXT NOT NULL,
    "capital" TEXT NOT NULL,
    "coverages" TEXT[],

    CONSTRAINT "Insurance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IsuranceToOccupation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IsuranceToOccupation_AB_unique" ON "_IsuranceToOccupation"("A", "B");

-- CreateIndex
CREATE INDEX "_IsuranceToOccupation_B_index" ON "_IsuranceToOccupation"("B");

-- AddForeignKey
ALTER TABLE "_IsuranceToOccupation" ADD CONSTRAINT "_IsuranceToOccupation_A_fkey" FOREIGN KEY ("A") REFERENCES "Insurance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IsuranceToOccupation" ADD CONSTRAINT "_IsuranceToOccupation_B_fkey" FOREIGN KEY ("B") REFERENCES "occupation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
