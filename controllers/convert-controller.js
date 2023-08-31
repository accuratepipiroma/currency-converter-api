const conversionService = require("../services/convert-service");
const localRatesService = require("../services/update-local-rates-service");
const { supportedCurrencies } = require("../constants");

async function convertCurrency(req, res) {
  try {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
      throw new Error("Missing required parameters.");
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      throw new Error("Invalid amount.");
    }

    const rates = await conversionService.getRates();

    let usedExternalRates = true;

    if (!rates) {
      usedExternalRates = false;
      console.log("Couldn't fetch external rates. Using cached rates.");
    }

    if (
      !supportedCurrencies.includes(from) ||
      !supportedCurrencies.includes(to)
    ) {
      throw new Error("Unsupported currencies.");
    }

    const externalRate = rates ? rates[to] / rates[from] : 0;

    const localRates = localRatesService.getLocalRates();
    const localRateFrom = localRates.rates[from];
    const localRateTo = localRates.rates[to];

    if (localRateFrom === undefined || localRateTo === undefined) {
      throw new Error("One or both local rates are missing.");
    }

    const bestRate = Math.max(externalRate, localRateTo / localRateFrom);

    const convertedAmount = (amount * bestRate).toFixed(2);

    const response = {
      from,
      to,
      amount,
      convertedAmount,
      rateUsed: bestRate,
      usedExternalRates,
    };

    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  convertCurrency,
};
