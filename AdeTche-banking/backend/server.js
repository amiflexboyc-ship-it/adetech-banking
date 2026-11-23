const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Home API
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to AdeTech Banking API"
    });
});

// Test API
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "AdeTech Banking Backend is working!"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`AdeTech Banking server running on port ${PORT}`);
});
