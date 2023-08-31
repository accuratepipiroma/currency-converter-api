const express = require("express");
const router = express.Router();
const conversionController = require("../controllers/convert-controller");

// Define the route for converting currency
router.get("/convert", conversionController.convertCurrency);

module.exports = router;
