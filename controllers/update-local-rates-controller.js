const localRatesService = require("../services/update-local-rates-service");

exports.updateLocalRates = async (req, res) => {
  try {
    const newData = req.body;
    await localRatesService.updateLocalRates(newData);
    res.json({ message: "Local rates updated manually" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
