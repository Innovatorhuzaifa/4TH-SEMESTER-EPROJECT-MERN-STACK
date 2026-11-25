import express from "express";
import protect from "../middlewares/authMiddleware.js ";
import authorizeRoles from "../middlewares/authorizeRoles.js ";






const router = express.Router();

// Protected Profile Route
router.get("/profile", protect, (req, res) => {
    res.status(200).json({
        message: "Profile accessed successfully",
        user: req.user
    });
});

// Admin Only Route
router.get(
    "/admin",
    protect,
    authorizeRoles("admin"),
    (req, res) => {
        res.status(200).json({
            message: "Welcome Admin! You have access."
        });
    }
);




export default router;