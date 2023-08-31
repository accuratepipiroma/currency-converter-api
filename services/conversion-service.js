require("dotenv").config();

const axios = require("axios");
const localRatesService = require("./local-rates-service");
const openExchangeRatesURL = process.env.OPENEXCHANGERATES_LATESTJSON_URL;
const appID = process.env.OPENEXCHANGERATES_APP_ID;

let lastFetchTime = 0;
let cachedRates = null;

async function getExternalRates() {
  try {
    const response = await axios.get(`${openExchangeRatesURL}?app_id=${appID}`);
    const rates = response.data.rates;
    return rates;
  } catch (error) {
    console.error("Error fetching external rates:", error);
    return null;
  }
}

async function getRates() {
  const currentTime = Math.floor(Date.now() / 1000);

  // Check if it's been more than an hour since last fetch AND it's a new hour
  if (currentTime - lastFetchTime > 3600 || new Date().getMinutes() === 0) {
    // Fetch fresh rates if more than 1 hour has passed or at the beginning of a new hour
    cachedRates = await getExternalRates();
    lastFetchTime = currentTime;
  }

  if (!cachedRates) {
    // If external rates couldn't be fetched, use cached rates
    return cachedRates;
  }

  const localRates = localRatesService.getLocalRates();

  // Compare external rates with local rates and use the better one for conversion
  const convertedRates = {};
  for (const currency in cachedRates) {
    const externalRate = cachedRates[currency];
    const localRate = localRates.rates[currency];
    convertedRates[currency] = Math.max(externalRate, localRate);
  }

  return convertedRates;
}

module.exports = {
  getRates,
};
