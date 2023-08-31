const express = require("express");
const updateLocalRatesController = require("../controllers/update-local-rates-controller");

const router = express.Router();

router.post("/update-local-rates", updateLocalRatesController.updateLocalRates);

module.exports = router;
