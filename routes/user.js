const express = require("express");
const router = express.Router();
const { userLogin, userSignUp, getUser } = require("../controller/user");

// Define user routes
router.post("/signUp", userSignUp);
router.post("/login", userLogin);
router.get("/:id", getUser);  // Adjusted to match "/user/:id" at the app level

module.exports = router;
