const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

// Route for registering a user
router.post("/register", usersController.registerUser);

// Route for generating a referral link
router.post("/generate-referral-link", usersController.generateReferralLink);

router.post("/signin", usersController.signinUser);

module.exports = router;
