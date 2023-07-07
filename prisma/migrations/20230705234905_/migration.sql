/*
  Warnings:

  - You are about to drop the column `historyId` on the `ProductList` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductList" DROP CONSTRAINT "ProductList_historyId_fkey";

-- AlterTable
ALTER TABLE "ProductList" DROP COLUMN "historyId";

-- CreateTable
CREATE TABLE "_HistoryToProductList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HistoryToProductList_AB_unique" ON "_HistoryToProductList"("A", "B");

-- CreateIndex
CREATE INDEX "_HistoryToProductList_B_index" ON "_HistoryToProductList"("B");

-- AddForeignKey
ALTER TABLE "_HistoryToProductList" ADD CONSTRAINT "_HistoryToProductList_A_fkey" FOREIGN KEY ("A") REFERENCES "History"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HistoryToProductList" ADD CONSTRAINT "_HistoryToProductList_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
