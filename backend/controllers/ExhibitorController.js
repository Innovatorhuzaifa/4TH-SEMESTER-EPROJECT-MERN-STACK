
import ExhibitorProfile from "../models/ExhibitorProfile.js";

// Create Exhibitor Profile
const createProfile = async (req, res) => {
    try {
        const {
            companyName,
            description,
            contactEmail,
            phone,
            website,
            logo,
            productsServices,
            address
        } = req.body;

        if (!companyName || !description || !contactEmail || !phone) {
            return res.status(400).json({
                message: "Please provide all required company details"
            });
        }

        const existingProfile = await ExhibitorProfile.findOne({
            user: req.user._id
        });

        if (existingProfile) {
            return res.status(400).json({
                message: "Exhibitor profile already exists"
            });
        }

        const profile = await ExhibitorProfile.create({
            user: req.user._id,
            companyName,
            description,
            contactEmail,
            phone,
            website,
            logo,
            productsServices,
            address
        });

        res.status(201).json({
            message: "Exhibitor profile created successfully",
            profile
        });

    } catch (error) {
        res.status(500).json({
            message: "Profile creation failed",
            error: error.message
        });
    }
};

// Get Own Exhibitor Profile
const getProfile = async (req, res) => {
    try {
        const profile = await ExhibitorProfile.findOne({
            user: req.user._id
        }).populate("user", "name email");

        if (!profile) {
            return res.status(404).json({
                message: "Exhibitor profile not found"
            });
        }

        res.status(200).json({ profile });

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch profile",
            error: error.message
        });
    }
};

// Update Exhibitor Profile
const updateProfile = async (req, res) => {
    try {
        const allowedFields = [
            "companyName",
            "description",
            "contactEmail",
            "phone",
            "website",
            "logo",
            "productsServices",
            "address"
        ];

        const updates = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const profile = await ExhibitorProfile.findOneAndUpdate(
            { user: req.user._id },
            { $set: updates },
            {
                new: true,
                runValidators: true
            }
        );

        if (!profile) {
            return res.status(404).json({
                message: "Exhibitor profile not found"
            });
        }

        res.status(200).json({
            message: "Exhibitor profile updated successfully",
            profile
        });

    } catch (error) {
        res.status(500).json({
            message: "Profile update failed",
            error: error.message
        });
    }
};

// Search and Filter Exhibitors
const searchExhibitors = async (req, res) => {
    try {
        const { search, product } = req.query;

        const filter = {};

        if (search) {
            filter.companyName = {
                $regex: search,
                $options: "i"
            };
        }

        if (product) {
            filter.productsServices = {
                $regex: product,
                $options: "i"
            };
        }

        const exhibitors = await ExhibitorProfile.find(filter)
            .populate("user", "name email");

        res.status(200).json({
            totalExhibitors: exhibitors.length,
            exhibitors
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to search exhibitors",
            error: error.message
        });
    }
};

export default {
    createProfile,
    getProfile,
    updateProfile,
    searchExhibitors
};
