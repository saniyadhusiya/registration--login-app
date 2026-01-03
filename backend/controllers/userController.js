import User from "../models/user.js";
import { generateUserId, generatePassword } from "../utils/helpers.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";

/* REGISTER USER */
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, age, mobile, gender, email } = req.body;

    const userId = generateUserId(firstName);
    const { random, hashed } = await generatePassword();

    const user = new User({
      userId,
      firstName,
      lastName,
      age,
      mobile,
      gender,
      email,
      password: hashed
    });

    await user.save();
    await sendEmail(email, userId, random);

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ msg: "Registration failed" });
  }
};

/*LOGIN USER (ADMIN FLAG ADDED)*/
export const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ msg: "Wrong password" });
    }

    // ✅ ADMIN CHECK
    const isAdmin = user.userId === "admin";

    res.json({
      msg: "Login success",
      isAdmin
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ msg: "Login failed" });
  }
};

/* GET ALL USERS (PAGINATION) */
export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const users = await User.find({}, "-password")
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments();

    res.json({
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      users
    });

  } catch (error) {
    console.error("Fetch Users Error:", error);
    res.status(500).json({ msg: "Failed to fetch users" });
  }
};
