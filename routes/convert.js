const express = require("express");
const router = express.Router();
const conversionController = require("../controllers/convert-controller");

/**
 * @swagger
 * /convert:
 *   get:
 *     summary: Convert currency
 *     parameters:
 *       - name: from
 *         in: query
 *         required: true
 *         description: The currency code to convert from (supported currencies are "EUR", "USD", "MXN", "BRL", "GBP")
 *       - name: to
 *         in: query
 *         required: true
 *         description: The currency code to convert to (supported currencies are "EUR", "USD", "MXN", "BRL", "GBP")
 *       - name: amount
 *         in: query
 *         required: true
 *         description: The amount to convert (must be number higher than zero)
 *         schema:
 *           type: number
 *           minimum: 0.01  # Amount should be greater than zero
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.get("/convert", conversionController.convertCurrency);

module.exports = router;
