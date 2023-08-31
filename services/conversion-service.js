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

  if (currentTime - lastFetchTime > 3600 || new Date().getMinutes() === 0) {
    cachedRates = await getExternalRates();
    lastFetchTime = currentTime;
  }

  if (!cachedRates) {
    return cachedRates;
  }

  const localRates = localRatesService.getLocalRates();
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
