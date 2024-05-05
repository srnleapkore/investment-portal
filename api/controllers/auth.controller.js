import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    firstname === "" ||
    lastname === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json("Signup successfull");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Incorrect credentials"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Incorrect credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_AUTH_KEY);
    const {password: pass, ...rest}  =validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
