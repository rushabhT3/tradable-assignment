const express = require("express");
const router = express.Router();
const referralLinksController = require("../controllers/referralLinks");

// Route for handling app installation using a referral link
router.post("/install-app", referralLinksController.handleAppInstallation);

module.exports = router;
