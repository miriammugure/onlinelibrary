import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const validateInfo = async (req, res, next) => {
  const { firstName, lastName, emailAddress, phoneNumber, password } = req.body;
  const parsedPhoneNumber = parseInt(phoneNumber, 10);
  try {
    if (!firstName) {
      return res
        .status(400)
        .json({ success: false, message: "First name is required" });
    }
    if (!lastName) {
      return res
        .status(400)
        .json({ success: false, message: "Last name is required" });
    }
    if (!emailAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    if (!parsedPhoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }

    const emailTaken = await prisma.user.findFirst({
      where: { emailAddress: emailAddress },
    });

    const phoneTaken = await prisma.user.findFirst({
      where: { phoneNumber: parsedPhoneNumber },
    });

    if (emailTaken) {
      return res
        .status(400)
        .json({ success: false, message: "Email already taken" });
    }
    if (phoneTaken) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number already taken" });
    }

    next();
  } catch (error) {
    console.error("Validation error:", error);
    return res
      .status(500)
      .json({ success: false, message: "an error occured in the server" });
  }
};
