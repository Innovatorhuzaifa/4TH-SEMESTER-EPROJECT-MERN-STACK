
import mongoose from "mongoose";

const exhibitorProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        companyName: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        contactEmail: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        website: {
            type: String,
            trim: true,
            default: ""
        },

        logo: {
            type: String,
            default: ""
        },

        productsServices: {
            type: [String],
            default: []
        },

        address: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const ExhibitorProfile = mongoose.model(
    "ExhibitorProfile",
    exhibitorProfileSchema
);

export default ExhibitorProfile;
