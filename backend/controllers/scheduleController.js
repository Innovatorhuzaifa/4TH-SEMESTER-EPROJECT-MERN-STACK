
import Schedule from "../models/Schedule.js";
import Event from "../models/Event.js";

// Create Schedule (Admin Only)
const createSchedule = async (req, res) => {
    try {
        const {
            eventId,
            title,
            topic,
            speaker,
            date,
            startTime,
            endTime,
            location
        } = req.body;

        if (
            !eventId ||
            !title ||
            !topic ||
            !speaker ||
            !date ||
            !startTime ||
            !endTime ||
            !location
        ) {
            return res.status(400).json({
                message: "All schedule details are required"
            });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        const schedule = await Schedule.create({
            event: eventId,
            title,
            topic,
            speaker,
            date,
            startTime,
            endTime,
            location
        });

        res.status(201).json({
            message: "Schedule created successfully",
            schedule
        });

    } catch (error) {
        res.status(500).json({
            message: "Schedule creation failed",
            error: error.message
        });
    }
};


// Get All Schedules for an Event
const getEventSchedules = async (req, res) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        const schedules = await Schedule.find({
            event: eventId
        }).sort({ date: 1, startTime: 1 });

        res.status(200).json({
            totalSchedules: schedules.length,
            schedules
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch schedules",
            error: error.message
        });
    }
};


// Update Schedule (Admin Only)
const updateSchedule = async (req, res) => {
    try {
        const {
            title,
            topic,
            speaker,
            date,
            startTime,
            endTime,
            location
        } = req.body;

        const schedule = await Schedule.findById(req.params.id);

        if (!schedule) {
            return res.status(404).json({
                message: "Schedule not found"
            });
        }

        if (title !== undefined) schedule.title = title;
        if (topic !== undefined) schedule.topic = topic;
        if (speaker !== undefined) schedule.speaker = speaker;
        if (date !== undefined) schedule.date = date;
        if (startTime !== undefined) schedule.startTime = startTime;
        if (endTime !== undefined) schedule.endTime = endTime;
        if (location !== undefined) schedule.location = location;

        await schedule.save();

        res.status(200).json({
            message: "Schedule updated successfully",
            schedule
        });

    } catch (error) {
        res.status(500).json({
            message: "Schedule update failed",
            error: error.message
        });
    }
};


// Delete Schedule (Admin Only)
const deleteSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);

        if (!schedule) {
            return res.status(404).json({
                message: "Schedule not found"
            });
        }

        await Schedule.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Schedule deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Schedule deletion failed",
            error: error.message
        });
    }
};


export default {
    createSchedule,
    getEventSchedules,
    updateSchedule,
    deleteSchedule
};
