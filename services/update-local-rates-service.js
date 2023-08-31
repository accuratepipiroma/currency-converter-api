const { supportedCurrencies } = require("../constants");

let localRates = {
  updated_at: 1640131200,
  base_currency: "USD",
  rates: {
    EUR: 0.9202,
    USD: 1,
    MXN: 17.0775,
    BRL: 4.9762,
  },
};

exports.getLocalRates = () => {
  return localRates;
};

exports.updateLocalRates = async (newData) => {
  if (!newData.base_currency || !newData.rates) {
    throw new Error("Invalid data format.");
  }

  if (typeof newData.base_currency !== "string") {
    throw new Error("Invalid base currency format.");
  }

  const updatedRates = { ...localRates.rates, ...newData.rates };

  const invalidRates = Object.entries(updatedRates).filter(
    ([currency, rate]) => {
      return (
        !supportedCurrencies.includes(currency) ||
        typeof rate !== "number" ||
        isNaN(rate)
      );
    }
  );

  if (invalidRates.length > 0) {
    const invalidCurrencies = invalidRates
      .map(([currency]) => currency)
      .join(", ");
    throw new Error(`Invalid currency rates: ${invalidCurrencies}`);
  }

  localRates.updated_at = Math.floor(Date.now() / 1000);
  localRates.base_currency = newData.base_currency;
  localRates.rates = updatedRates;
};
