
import express from "express";
import expoApplicationController from "../controllers/expoApplicationController.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

const router = express.Router();

// Submit Expo Application
router.post(
    "/",
    protect,
    authorizeRoles("exhibitor"),
    expoApplicationController.submitApplication
);

// Get All Own Applications
router.get(
    "/",
    protect,
    authorizeRoles("exhibitor"),
    expoApplicationController.getMyApplications
);


// Admin: Get All Expo Applications
router.get(
    "/admin/all",
    protect,
    authorizeRoles("admin"),
    expoApplicationController.getAllApplications
);

// Admin: Approve or Reject Application
router.put(
    "/admin/:id/status",
    protect,
    authorizeRoles("admin"),
    expoApplicationController.updateApplicationStatus
);

// Get Single Application
router.get(
    "/:id",
    protect,
    authorizeRoles("exhibitor"),
    expoApplicationController.getSingleApplication
);


export default router;
