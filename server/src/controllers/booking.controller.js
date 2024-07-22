import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createBooking = async (req, res) => {
  const { userId, bookId, amount, rentDate, returnDate, title } = req.body;

  try {
    if (!userId || !bookId || !amount || !rentDate || !returnDate || !title) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        bookId,
        amount,
        title,
        rentDate: new Date(rentDate),
        returnDate: new Date(returnDate),
      },
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
