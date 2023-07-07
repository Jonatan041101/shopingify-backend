-- CreateTable
CREATE TABLE "ProductList" (
    "id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "historyId" TEXT NOT NULL,

    CONSTRAINT "ProductList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductList_productId_key" ON "ProductList"("productId");

-- AddForeignKey
ALTER TABLE "ProductList" ADD CONSTRAINT "ProductList_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductList" ADD CONSTRAINT "ProductList_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
