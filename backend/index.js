const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const Routes = require("./routes/route.js");

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Check Mongo URL
if (!MONGO_URL) {
    console.error("❌ MONGO_URL is not set in .env file");
    process.exit(1);
}

// Connect to MongoDB
mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("✅ Connected to MongoDB");

        // Routes
        app.use("/", Routes);

        // Start server only after DB is connected
        app.listen(PORT, () => {
            console.log(`🚀 Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(" Failed to connect to MongoDB", err);
        process.exit(1);
    });
