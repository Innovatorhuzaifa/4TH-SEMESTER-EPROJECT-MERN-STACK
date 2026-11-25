import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

// Register Route
router.post("/register", authController.registerUser);

// Login Route
router.post("/login", authController.loginUser);

//forgot password
router.post("/forgot-password", authController.forgotPassword);

//reset password
router.post("/reset-password", authController.resetPassword);





export default router;

