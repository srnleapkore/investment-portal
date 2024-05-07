import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const sample = (req, res) => {
  res.json({ message: "API working" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You cannot make changes to this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 8) {
      return next(errorHandler(400, "Password must be atleast 8 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          password: req.body.password,
          profilepicture: req.body.profilepicture,
        },
      },
      { new: true }
    );
    const {password, ...rest} = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
