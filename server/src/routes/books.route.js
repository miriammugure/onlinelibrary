import Router from "express";
import { validateInfo } from "../middlewares/users.middleware.js";
import {
  createBooks,
  deleteBooks,
  getBooks,
  getBooksById,
  updateBook,
} from "../controllers/books.controllers.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";
import { verifyMember } from "../middlewares/verifyApprovedUser.middleware.js";
import { createBooking } from "../controllers/booking.controller.js";

const router = Router();
router.get("/admin/getbooks", verifyAdmin, getBooks);

router.post("/admin/newbooks", verifyAdmin, createBooks);
router.post("/members/bookings", verifyMember, createBooking);
router.get("/members/getbooks", verifyMember, getBooks);
router.get("/members/getbooks/:id", verifyMember, getBooksById);
router.delete("/deletebooks/:id", verifyAdmin, deleteBooks);
router.patch("/updatebooks/:id", verifyAdmin, updateBook);

export default router;
