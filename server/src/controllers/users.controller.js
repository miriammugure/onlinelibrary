import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    password,
    approvedAccount,
    role,
  } = req.body;
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  const parsedNumber = parseInt(phoneNumber);
  try {
    const newUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        phoneNumber: parsedNumber,
        password: hashedPassword,
        role: role,
        approvedAccount: approvedAccount,
      },
      select: {
        firstName: true,
        lastName: true,
        emailAddress: true,
        role: true,
        approvedAccount: true,
      },
    });
    res
      .status(200)
      .json({ success: true, message: "account requested successfully" });
    // console.log(newUser);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getUser = async (req, res) => {
  try {
    const fetchUsers = await prisma.user.findMany({
      where: {
        role: "user",
        approvedAccount: false,
      },
    });
    // console.log(fetchUsers)
    res.status(200).send(fetchUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};
export const getApprovedUser = async (req, res) => {
  try {
    const getApprovedUsers = await prisma.user.findMany({
      where: {
        role: "user",
        approvedAccount: true,
      },
    });
    // console.log(fetchUsers)
    res.send(getApprovedUsers);
    // res.status(200).json({success:true,message:"members fetched succesfully"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};
export const approveUser = async (req, res) => {
  try {
    const id = req.params.id;
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        approvedAccount: true,
      },
    });
    res
      .status(200)
      .json({ success: true, message: "user approved successfully" });

    // console.log(approvedUser)
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
};
export const declineUser = async (req, res) => {
  try {
    const id = req.params.id;
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res
      .status(200)
      .json({ success: true, message: "user declined successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
};
