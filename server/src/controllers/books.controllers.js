import { PrismaClient } from "@prisma/client";
import cloudinary from "../../cloudinary/cloudinary.js";
const prisma = new PrismaClient();

export const createBooks = async (req, res) => {
  const { image, title, description, author, amount } = req.body;
  const parsedAmount = parseInt(amount);
  const uploadedImage = await cloudinary.uploader.upload(
    image,
    {
      upload_preset: "medics",
      allowed_formats: ["png", "jpg", "jpeg", "webp", "ico", "jfif", "svg"],
    },
    function (error, result) {
      if (error) {
        console.log(error);
      }
    },
  );
  console.log("Image uploaded to Cloudinary:", uploadedImage);

  try {
    const newBook = await prisma.books.create({
      data: {
        image: uploadedImage.secure_url,
        title: title,
        description: description,
        author: author,
        amount: parsedAmount,
      },
      select: {
        image: true,
        title: true,
        author: true,
        description: true,
        amount: true,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "book created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
export const getBooks = async (req, res) => {
  try {
    const fetchBooks = await prisma.books.findMany({
      select: {
        id: true,
        image: true,
        title: true,
        author: true,
        description: true,
        amount: true,
      },
    });
    res.json(fetchBooks);
    // res.send("heyy")
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteBooks = async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.books.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "book deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getBooksById = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await prisma.books.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        image: true,
        title: true,
        author: true,
        description: true,
        amount: true,
      },
    });
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ success: false, message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
