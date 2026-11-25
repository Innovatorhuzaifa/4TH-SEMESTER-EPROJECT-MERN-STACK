import express from "express";
import sessionRegistrationController from "../controllers/sessionRegistrationController.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

const router = express.Router();

// Attendee: Register for a Session
router.post(
    "/",
    protect,
    authorizeRoles("attendee"),
    sessionRegistrationController.registerForSession
);


// Attendee: Get All My Session Registrations
router.get(
    "/my",
    protect,
    authorizeRoles("attendee"),
    sessionRegistrationController.getMySessionRegistrations
);

// Attendee: Cancel Session Registration
router.put(
    "/:id/cancel",
    protect,
    authorizeRoles("attendee"),
    sessionRegistrationController.cancelSessionRegistration
);




export default router;