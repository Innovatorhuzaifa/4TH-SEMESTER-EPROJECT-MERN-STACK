import express from "express";
import eventController from "../controllers/eventController.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

const router = express.Router();

// Create Event (Admin Only)
router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    eventController.createEvent
);


// Create Event (Admin Only)
router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    eventController.createEvent
);

// Get All Events
router.get(
    "/",
    eventController.getAllEvents
);

// Update Event (Admin Only)
router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    eventController.updateEvent
);

// Delete Event (Admin Only)
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    eventController.deleteEvent
);


// Get All Events
router.get(
    "/",
    eventController.getAllEvents
);

// Get Single Event
router.get(
    "/:id",
    eventController.getSingleEvent
);



export default router;