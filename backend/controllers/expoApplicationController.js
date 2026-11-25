
import ExpoApplication from "../models/ExpoApplication.js";
import ExhibitorProfile from "../models/ExhibitorProfile.js";
import Event from "../models/Event.js";

// Submit Expo Application
const submitApplication = async (req, res) => {
    try {
        const { eventId, productsServices, documents } = req.body;

        if (
            !eventId ||
            !Array.isArray(productsServices) ||
            productsServices.length === 0
        ) {
            return res.status(400).json({
                message: "Event and products/services are required"
            });
        }

        const profile = await ExhibitorProfile.findOne({
            user: req.user._id
        });

        if (!profile) {
            return res.status(404).json({
                message: "Please create your exhibitor profile first"
            });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        const existingApplication = await ExpoApplication.findOne({
            exhibitor: req.user._id,
            event: eventId
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this event"
            });
        }

        const application = await ExpoApplication.create({
            exhibitor: req.user._id,
            exhibitorProfile: profile._id,
            event: eventId,
            productsServices,
            documents: documents || []
        });

        res.status(201).json({
            message: "Expo application submitted successfully",
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Application submission failed",
            error: error.message
        });
    }
};

// Get All Own Applications
const getMyApplications = async (req, res) => {
    try {
        const applications = await ExpoApplication.find({
            exhibitor: req.user._id
        })
            .populate("event")
            .populate("exhibitorProfile");

        res.status(200).json({
            totalApplications: applications.length,
            applications
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch applications",
            error: error.message
        });
    }
};

// Get Single Own Application
const getSingleApplication = async (req, res) => {
    try {
        const application = await ExpoApplication.findOne({
            _id: req.params.id,
            exhibitor: req.user._id
        })
            .populate("event")
            .populate("exhibitorProfile");

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json({
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch application",
            error: error.message
        });
    }
};

// Get All Applications (Admin Only)
const getAllApplications = async (req, res) => {
    try {
        const applications = await ExpoApplication.find()
            .populate("exhibitor", "name email")
            .populate("exhibitorProfile")
            .populate("event");

        res.status(200).json({
            totalApplications: applications.length,
            applications
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch applications",
            error: error.message
        });
    }
};

// Update Application Status (Admin Only)
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({
                message: "Status must be approved or rejected"
            });
        }

        const application = await ExpoApplication.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        )
            .populate("exhibitor", "name email")
            .populate("event");

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json({
            message: `Application ${status} successfully`,
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to update application status",
            error: error.message
        });
    }
};

// Export All Functions
export default {
    submitApplication,
    getMyApplications,
    getSingleApplication,
    getAllApplications,
    updateApplicationStatus,

};

