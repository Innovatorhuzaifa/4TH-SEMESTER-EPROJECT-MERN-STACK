
import express from "express";
import boothController from "../controllers/boothController.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";



const router = express.Router();


// Admin: Create Booth
router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    boothController.createBooth
);


// Get All Booths for an Event
router.get(
    "/event/:eventId",
    protect,
    boothController.getEventBooths
);

// Admin: Update Booth
router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    boothController.updateBooth
);


// Admin: Delete Booth
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    boothController.deleteBooth
);


// Exhibitor: Reserve Booth
router.post(
    "/:id/reserve",
    protect,
    authorizeRoles("exhibitor"),
    boothController.reserveBooth
);



export default router;
