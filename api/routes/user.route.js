import express from "express";
import {
  deleteUser,
  logout,
  sample,
  updatePassword,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/sample", sample);
router.put("/updateprofile/:userId", verifyToken, updateUser);
router.put("/changepass/:userId", verifyToken, updatePassword);
router.delete("/deleteuser/:userId", verifyToken, deleteUser);
router.post('/logout', logout);

export default router;
