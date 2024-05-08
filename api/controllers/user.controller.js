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

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          profilepicture: req.body.profilepicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return next(
        errorHandler(400, "New password and confirm password do not match")
      );
    }

    const user = await User.findById(req.params.userId);
    const isPasswordValid = await bcryptjs.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return next(errorHandler(400, "Current password is incorrect"));
    }

    if (newPassword.length < 8) {
      return next(
        errorHandler(400, "New password must be at least 8 characters")
      );
    }

    const hashedNewPassword = bcryptjs.hashSync(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { password: hashedNewPassword } },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You cannot delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
