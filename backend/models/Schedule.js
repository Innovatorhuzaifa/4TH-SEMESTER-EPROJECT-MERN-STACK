
import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        topic: {
            type: String,
            required: true,
            trim: true
        },
        speaker: {
            type: String,
            required: true,
            trim: true
        },
        date: {
            type: Date,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
