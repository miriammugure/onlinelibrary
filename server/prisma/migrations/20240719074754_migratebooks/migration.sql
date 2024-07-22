-- CreateTable
CREATE TABLE "books_table" (
    "id" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_table_imgUrl_key" ON "books_table"("imgUrl");

-- CreateIndex
CREATE UNIQUE INDEX "books_table_title_key" ON "books_table"("title");
