
import mongoose from "mongoose";

const expoApplicationSchema = new mongoose.Schema(
    {
        exhibitor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        exhibitorProfile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ExhibitorProfile",
            required: true
        },

        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },

        productsServices: {
            type: [String],
            required: true,
            validate: {
                validator: function (value) {
                    return value.length > 0;
                },
                message: "At least one product or service is required"
            }
        },

        documents: [
            {
                documentName: {
                    type: String,
                    required: true
                },

                documentUrl: {
                    type: String,
                    required: true
                }
            }
        ],

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

expoApplicationSchema.index(
    { exhibitor: 1, event: 1 },
    { unique: true }
);

const ExpoApplication = mongoose.model(
    "ExpoApplication",
    expoApplicationSchema
);

export default ExpoApplication;
