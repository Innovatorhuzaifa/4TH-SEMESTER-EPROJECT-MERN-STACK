
import express from "express";
import scheduleController from "../controllers/scheduleController.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

const router = express.Router();

// Admin: Create Schedule
router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    scheduleController.createSchedule
);

// Get All Schedules for an Event
router.get(
    "/event/:eventId",
    protect,
    scheduleController.getEventSchedules
);

// Admin: Update Schedule
router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    scheduleController.updateSchedule
);


// Admin: Delete Schedule
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    scheduleController.deleteSchedule
);


export default router;
