
import mongoose from "mongoose";

const boothSchema = new mongoose.Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },
        boothNumber: {
            type: String,
            required: true,
            trim: true
        },
        size: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["available", "reserved", "occupied"],
            default: "available"
        },
        exhibitor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        productsServices: {
            type: [String],
            default: []
        },
        staff: [
            {
                name: {
                    type: String,
                    required: true
                },
                designation: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    { timestamps: true }
);

boothSchema.index(
    { event: 1, boothNumber: 1 },
    { unique: true }
);

const Booth = mongoose.model("Booth", boothSchema);

export default Booth;
