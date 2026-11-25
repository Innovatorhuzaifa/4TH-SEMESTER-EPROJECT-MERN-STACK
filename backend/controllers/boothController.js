
import Booth from "../models/Booth.js";
import Event from "../models/Event.js";
import ExpoApplication from "../models/ExpoApplication.js";



// Create Booth (Admin Only)
const createBooth = async (req, res) => {
    try {
        const { eventId, boothNumber, size, location } = req.body;

        // Validate required fields
        if (!eventId || !boothNumber || !size || !location) {
            return res.status(400).json({
                message: "All booth details are required"
            });
        }

        // Check if event exists
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // Check duplicate booth number in same event
        const existingBooth = await Booth.findOne({
            event: eventId,
            boothNumber
        });

        if (existingBooth) {
            return res.status(400).json({
                message: "This booth number already exists for this event"
            });
        }

        // Create booth
        const booth = await Booth.create({
            event: eventId,
            boothNumber,
            size,
            location
        });

        res.status(201).json({
            message: "Booth created successfully",
            booth
        });

    } catch (error) {
        res.status(500).json({
            message: "Booth creation failed",
            error: error.message
        });
    }
};


// Get All Booths for an Event
const getEventBooths = async (req, res) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        const booths = await Booth.find({
            event: eventId
        }).populate("exhibitor", "name email");

        res.status(200).json({
            totalBooths: booths.length,
            booths
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch booths",
            error: error.message
        });
    }
};



// Update Booth (Admin Only)
const updateBooth = async (req, res) => {
    try {
        const {
            boothNumber,
            size,
            location,
            status,
            productsServices,
            staff
        } = req.body;

        const booth = await Booth.findById(req.params.id);

        if (!booth) {
            return res.status(404).json({
                message: "Booth not found"
            });
        }

        if (boothNumber !== undefined) booth.boothNumber = boothNumber;
        if (size !== undefined) booth.size = size;
        if (location !== undefined) booth.location = location;

        if (status !== undefined) {
            if (!["available", "reserved", "occupied"].includes(status)) {
                return res.status(400).json({
                    message: "Invalid booth status"
                });
            }

            booth.status = status;
        }

        if (productsServices !== undefined) {
            if (!Array.isArray(productsServices)) {
                return res.status(400).json({
                    message: "Products and services must be an array"
                });
            }

            booth.productsServices = productsServices;
        }

        if (staff !== undefined) {
            if (!Array.isArray(staff)) {
                return res.status(400).json({
                    message: "Staff must be an array"
                });
            }

            booth.staff = staff;
        }

        await booth.save();

        res.status(200).json({
            message: "Booth updated successfully",
            booth
        });

    } catch (error) {
        res.status(500).json({
            message: "Booth update failed",
            error: error.message
        });
    }
};




// Delete Booth (Admin Only)
const deleteBooth = async (req, res) => {
    try {
        const booth = await Booth.findById(req.params.id);

        if (!booth) {
            return res.status(404).json({
                message: "Booth not found"
            });
        }

        if (booth.status !== "available") {
            return res.status(400).json({
                message: "Only available booths can be deleted"
            });
        }

        await Booth.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Booth deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Booth deletion failed",
            error: error.message
        });
    }
};


// Reserve Booth (Approved Exhibitors Only)
const reserveBooth = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if booth exists
        const booth = await Booth.findById(id);

        if (!booth) {
            return res.status(404).json({
                message: "Booth not found"
            });
        }

        // Check approved application for this event
        const application = await ExpoApplication.findOne({
            exhibitor: req.user._id,
            event: booth.event,
            status: "approved"
        });

        if (!application) {
            return res.status(403).json({
                message: "You need an approved application to reserve a booth"
            });
        }

        // Reserve only if booth is available
        const reservedBooth = await Booth.findOneAndUpdate(
            {
                _id: id,
                status: "available"
            },
            {
                status: "reserved",
                exhibitor: req.user._id
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!reservedBooth) {
            return res.status(400).json({
                message: "This booth is no longer available"
            });
        }

        res.status(200).json({
            message: "Booth reserved successfully",
            booth: reservedBooth
        });

    } catch (error) {
        res.status(500).json({
            message: "Booth reservation failed",
            error: error.message
        });
    }
};


export default {
    createBooth,
    getEventBooths,
    updateBooth,
    deleteBooth,
    reserveBooth
};
