
import express from "express";
import exhibitorController from "../controllers/ExhibitorController.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

const router = express.Router();

// Create Exhibitor Profile
router.post(
    "/profile",
    protect,
    authorizeRoles("exhibitor"),
    exhibitorController.createProfile
);

// Get Own Exhibitor Profile
router.get(
    "/profile",
    protect,
    authorizeRoles("exhibitor"),
    exhibitorController.getProfile
);

// Update Own Exhibitor Profile
router.put(
    "/profile",
    protect,
    authorizeRoles("exhibitor"),
    exhibitorController.updateProfile
);

// Search and Filter Exhibitors
router.get(
    "/search",
    protect,
    exhibitorController.searchExhibitors
);

export default router;
