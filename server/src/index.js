import express from "express";
import { config } from "dotenv";
import cors from "cors";
import createUserRoutes from "./routes/users.route.js";
import cookieParser from "cookie-parser";
import createBookRoutes from "./routes/books.route.js";
import deleteBooksRoutes from "./routes/books.route.js";
import bookBooksRoutes from "./routes/books.route.js";
import bookUpdateBooks from "./routes/books.route.js";
config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", createUserRoutes);
app.use("/api/books", createBookRoutes);
app.use("/api/books", deleteBooksRoutes);
app.use("/api/booking", bookBooksRoutes);
app.use("/api/books", bookUpdateBooks);

app.listen(3000, () => {
  console.log("server running");
});
