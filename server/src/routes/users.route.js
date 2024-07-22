import Router from "express";
import {
  approveUser,
  createUser,
  declineUser,
  getUser,
} from "../controllers/users.controller.js";
import { validateInfo } from "../middlewares/users.middleware.js";
import { loginUser } from "../controllers/login.controller.js";
import { getApprovedUser } from "../controllers/users.controller.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";
const router = Router();

router.post("/newuser", validateInfo, createUser);
router.post("/loginUser", loginUser);
router.get("/getUser", verifyAdmin, getUser);
router.get("/getApprovedUser", verifyAdmin, getApprovedUser);
router.patch("/approveUser/:id", verifyAdmin, approveUser);
router.delete("/declineUser/:id", verifyAdmin, declineUser);

export default router;
