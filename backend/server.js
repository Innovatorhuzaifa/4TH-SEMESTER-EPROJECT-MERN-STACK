
import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import exhibitorRoutes from "./routes/ExhibitorRoutes.js";
import expoApplicationRoutes from "./routes/expoApplicationRoutes.js";
import boothRoutes from "./routes/boothRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import sessionRegistrationRoutes from "./routes/sessionRegistrationRoutes.js";






dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


//Event routes
app.use("/api/events", eventRoutes);

//user Routes
app.use("/api/users", userRoutes);


//Authentication routes
app.use("/api/auth", authRoutes);


// Home Route
app.get("/", (req, res) => {
    res.send("EventSphere Server is Running");

});

  //exhibitor routes
app.use("/api/exhibitors", exhibitorRoutes);

// Expo Application Routes
app.use("/api/applications", expoApplicationRoutes);


// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {
    await connectDatabase();

// Booth routes
app.use("/api/booths", boothRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
};

// Schedule routes
app.use("/api/schedules", scheduleRoutes);

// Registration routes
app.use("/api/registrations", registrationRoutes);


// Session Registration routes
app.use("/api/session-registrations", sessionRegistrationRoutes);


startServer();
export default app;