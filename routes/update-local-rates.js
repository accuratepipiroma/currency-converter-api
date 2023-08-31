const express = require("express");
const updateLocalRatesController = require("../controllers/update-local-rates-controller");

const router = express.Router();

/**
 * @swagger
 * /update-local-rates:
 *   post:
 *     summary: Update local rates
 *     description: Update local exchange rates manually (supported currencies are "EUR", "USD", "MXN", "BRL", "GBP")
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               base_currency:
 *                 type: string
 *                 description: Base currency code
 *               rates:
 *                 type: object
 *                 description: Exchange rates for supported currencies
 *             example:
 *               base_currency: USD
 *               rates:
 *                 EUR: 0.9202
 *                 USD: 1
 *                 MXN: 17.0775
 *                 BRL: 4.9762
 *     responses:
 *       200:
 *         description: Local rates updated
 *       400:
 *         description: Bad request
 */
router.post("/update-local-rates", updateLocalRatesController.updateLocalRates);

module.exports = router;
