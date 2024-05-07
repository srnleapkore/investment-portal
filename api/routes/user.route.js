import express from "express";
import { sample, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/sample", sample);
router.put("/updateprofile/:userId", verifyToken, updateUser);

export default router;
