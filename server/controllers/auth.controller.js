import { LoginSchema, SignupSchema } from "../types/validate.js";
import User from "../db/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupController = async (req, res) => {
  try {
    const { username, email, password } = SignupSchema.parse(req.body);

    const existing_User = await User.findOne({ username });
    if (existing_User) {
      return res
        .status(400)
        .json({ message: "User already exists with these credentials" });
    }

    const hashed = await bcryptjs.hash(password, 12);

    const new_user = new User({
      username,
      email,
      password: hashed,
    });

    await new_user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = LoginSchema.parse(req.body);

    const existing_User = await User.findOne({ username });
    if (!existing_User) {
      return res.status(401).json({ message: "Unknown credentials" });
    }

    const matches = await bcryptjs.compare(password, existing_User.password);
    if (!matches) {
      return res.status(401).json({ message: "Creds don't match" });
    }

    const token = jwt.sign(
      { userId: existing_User._id, username: existing_User.username },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};

export const currentUserController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error.message);
  }
};
