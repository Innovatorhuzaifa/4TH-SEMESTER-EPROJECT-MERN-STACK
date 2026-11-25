import Event from "../models/Event.js";

// Create New Event
const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            location,
            date,
            startTime,
            endTime,
            image
        } = req.body;

        // Create Event
        const newEvent = await Event.create({
            title,
            description,
            category,
            location,
            date,
            startTime,
            endTime,
            image,
            createdBy: req.user._id
        });

        res.status(201).json({
            message: "Event created successfully",
            event: newEvent
        });

    } catch (error) {
        res.status(500).json({
            message: "Event creation failed",
            error: error.message
        });
    }
};



// Get All Events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Events fetched successfully",
            totalEvents: events.length,
            events
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch events",
            error: error.message
        });
    }
};

// Update Event
const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedEvent) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent
        });

    } catch (error) {
        res.status(500).json({
            message: "Event update failed",
            error: error.message
        });
    }
};

// Delete Event
const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(
            req.params.id
        );

        if (!deletedEvent) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Event deletion failed",
            error: error.message
        });
    }
};


// Get Single Event
const getSingleEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate("createdBy", "name email");

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event fetched successfully",
            event
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch event",
            error: error.message
        });
    }
};


export default { createEvent,getAllEvents,updateEvent,deleteEvent,getSingleEvent };