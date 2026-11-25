
import Registration from "../models/Registration.js";
import Event from "../models/Event.js";

// Register Attendee for an Event
const registerForEvent = async (req, res) => {
    try {
        const { eventId } = req.body;

        if (!eventId) {
            return res.status(400).json({
                message: "Event ID is required"
            });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        const existingRegistration = await Registration.findOne({
            attendee: req.user._id,
            event: eventId
        });

        if (existingRegistration) {
            return res.status(400).json({
                message: "You have already registered for this event"
            });
        }

        const registration = await Registration.create({
            attendee: req.user._id,
            event: eventId
        });

        res.status(201).json({
            message: "Event registration successful",
            registration
        });

    } catch (error) {
        res.status(500).json({
            message: "Event registration failed",
            error: error.message
        });
    }
};


// Get All Registrations of Logged-in Attendee
const getMyRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({
            attendee: req.user._id
        }).populate("event");

        res.status(200).json({
            message: "Your event registrations fetched successfully",
            registrations
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch registrations",
            error: error.message
        });
    }
};

// Cancel Event Registration
const cancelRegistration = async (req, res) => {
    try {
        const registration = await Registration.findOne({
            _id: req.params.id,
            attendee: req.user._id
        });

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        if (registration.status === "cancelled") {
            return res.status(400).json({
                message: "Registration is already cancelled"
            });
        }

        registration.status = "cancelled";
        await registration.save();

        res.status(200).json({
            message: "Event registration cancelled successfully",
            registration
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to cancel registration",
            error: error.message
        });
    }
};

export default {
    registerForEvent,
    getMyRegistrations,
    cancelRegistration,
    
};
