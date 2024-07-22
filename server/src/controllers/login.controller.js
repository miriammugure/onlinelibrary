import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const loginUser = async (req, res) => {
  const { emailAddress, password } = req.body;
  try {
    const login = await prisma.user.findFirst({
      where: {
        emailAddress: emailAddress,
      },
    });
    if (!login) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid login credentials" });
    }

    if (login.approvedAccount === false) {
      return res
        .status(400)
        .json({ success: false, message: "Account not yet approved" });
    }

    const passwordMatch = bcrypt.compareSync(password, login.password);
    if (passwordMatch) {
      const payload = {
        id: login.id,
        firstName: login.firstName,
        lastName: login.lastName,
        emailAddress: login.emailAddress,
        role: login.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("access_token", token).json({
        success: true,
        data: payload,
        token,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
