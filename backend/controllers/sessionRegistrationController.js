import SessionRegistration from "../models/SessionRegistration.js";
import Schedule from "../models/Schedule.js";

// Register Attendee for a Session
const registerForSession = async (req, res) => {
    try {
        const { scheduleId } = req.body;

        if (!scheduleId) {
            return res.status(400).json({
                message: "Schedule ID is required"
            });
        }

        const schedule = await Schedule.findById(scheduleId);

        if (!schedule) {
            return res.status(404).json({
                message: "Session not found"
            });
        }

        const existingRegistration = await SessionRegistration.findOne({
            attendee: req.user._id,
            schedule: scheduleId
        });

        if (existingRegistration) {
            return res.status(400).json({
                message: "You have already registered for this session"
            });
        }

        const registration = await SessionRegistration.create({
            attendee: req.user._id,
            schedule: scheduleId
        });

        res.status(201).json({
            message: "Session registration successful",
            registration
        });

    } catch (error) {
        res.status(500).json({
            message: "Session registration failed",
            error: error.message
        });
    }
};


// Get All Session Registrations of Logged-in Attendee
const getMySessionRegistrations = async (req, res) => {
    try {
        const registrations = await SessionRegistration.find({
            attendee: req.user._id
        }).populate("schedule");

        res.status(200).json({
            message: "Your session registrations fetched successfully",
            registrations
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch session registrations",
            error: error.message
        });
    }
};

// Cancel Session Registration
const cancelSessionRegistration = async (req, res) => {
    try {
        const registration = await SessionRegistration.findOne({
            _id: req.params.id,
            attendee: req.user._id
        });

        if (!registration) {
            return res.status(404).json({
                message: "Session registration not found"
            });
        }

        if (registration.status === "cancelled") {
            return res.status(400).json({
                message: "Session registration is already cancelled"
            });
        }

        registration.status = "cancelled";
        await registration.save();

        res.status(200).json({
            message: "Session registration cancelled successfully",
            registration
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to cancel session registration",
            error: error.message
        });
    }
};

export default {
    registerForSession,
    getMySessionRegistrations,
    cancelSessionRegistration
};