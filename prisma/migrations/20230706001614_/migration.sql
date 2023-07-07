/*
  Warnings:

  - You are about to drop the `_ProductToProductList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `ProductList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductToProductList" DROP CONSTRAINT "_ProductToProductList_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToProductList" DROP CONSTRAINT "_ProductToProductList_B_fkey";

-- AlterTable
ALTER TABLE "ProductList" ADD COLUMN     "productId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ProductToProductList";

-- AddForeignKey
ALTER TABLE "ProductList" ADD CONSTRAINT "ProductList_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
