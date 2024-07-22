-- CreateTable
CREATE TABLE "bookings_table" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "rentDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_table_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bookings_table" ADD CONSTRAINT "bookings_table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings_table" ADD CONSTRAINT "bookings_table_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
