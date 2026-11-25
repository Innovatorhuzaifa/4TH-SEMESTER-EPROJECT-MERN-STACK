import mongoose from "mongoose";

const sessionRegistrationSchema = new mongoose.Schema(
    {
        attendee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        schedule: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Schedule",
            required: true
        },
        status: {
            type: String,
            enum: ["registered", "cancelled"],
            default: "registered"
        }
    },
    { timestamps: true }
);

// One attendee can register only once for each session
sessionRegistrationSchema.index(
    { attendee: 1, schedule: 1 },
    { unique: true }
);

const SessionRegistration = mongoose.model(
    "SessionRegistration",
    sessionRegistrationSchema
);

export default SessionRegistration;