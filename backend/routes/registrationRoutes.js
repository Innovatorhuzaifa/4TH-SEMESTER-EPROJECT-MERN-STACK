
import express from "express";
import registrationController from "../controllers/registrationController.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

const router = express.Router();

// Attendee: Register for an Event
router.post(
    "/",
    protect,
    authorizeRoles("attendee"),
    registrationController.registerForEvent
);

// Attendee: Get All My Registrations
router.get(
    "/my",
    protect,
    authorizeRoles("attendee"),
    registrationController.getMyRegistrations
);


// Attendee: Cancel Event Registration
router.put(
    "/:id/cancel",
    protect,
    authorizeRoles("attendee"),
    registrationController.cancelRegistration
);



export default router;
