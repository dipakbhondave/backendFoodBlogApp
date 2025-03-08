const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectionDb");
const cors = require("cors");
const morgan = require("morgan");


const app = express();

// Load environment variables
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDb()
  .then(() => {
    console.log("✅ Database Connected Successfully");

    // Middleware
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev")); // Logs HTTP requests
    app.use(express.static("public")); // Serve static files
    

    // Routes
    app.use("/user", require("./routes/user")); // Prefixed "/user"
    app.use("/recipe", require("./routes/recipe"));

    // Default Route
    app.get("/", (req, res) => {
      res.send("Welcome to the Food Recipe API 🍽️");
    });

    // Error Handling Middleware
    app.use((err, req, res, next) => {
      console.error("❌ Error:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    });

    // Start Server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed:", err.message);
    process.exit(1); // Exit if DB connection fails
  });
