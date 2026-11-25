
import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
    {
        attendee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },
        registrationDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ["registered", "cancelled"],
            default: "registered"
        }
    },
    { timestamps: true }
);

// One attendee can register only once for each event
registrationSchema.index(
    { attendee: 1, event: 1 },
    { unique: true }
);

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
