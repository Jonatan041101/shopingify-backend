/*
  Warnings:

  - You are about to drop the column `productId` on the `ProductList` table. All the data in the column will be lost.
  - You are about to drop the `_HistoryToProductList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `historyId` to the `ProductList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductList" DROP CONSTRAINT "ProductList_productId_fkey";

-- DropForeignKey
ALTER TABLE "_HistoryToProductList" DROP CONSTRAINT "_HistoryToProductList_A_fkey";

-- DropForeignKey
ALTER TABLE "_HistoryToProductList" DROP CONSTRAINT "_HistoryToProductList_B_fkey";

-- DropIndex
DROP INDEX "ProductList_productId_key";

-- AlterTable
ALTER TABLE "ProductList" DROP COLUMN "productId",
ADD COLUMN     "historyId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_HistoryToProductList";

-- CreateTable
CREATE TABLE "_ProductToProductList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductList_AB_unique" ON "_ProductToProductList"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductList_B_index" ON "_ProductToProductList"("B");

-- AddForeignKey
ALTER TABLE "ProductList" ADD CONSTRAINT "ProductList_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductList" ADD CONSTRAINT "_ProductToProductList_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductList" ADD CONSTRAINT "_ProductToProductList_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
