const {
  removeWantToVisitCountry,
  getWantToVisitCountry,
  addWantToVisitCountry,
} = require("../models/wantToVisitModel");

exports.addWantToVisitController = async (req, res) => {
  const { userId, countryCode } = req.body;

  try {
    const result = await addWantToVisitCountry(userId, countryCode);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getWantToVisitController = async (req, res) => {
  const { userId } = req.params;

  try {
    const countries = await getWantToVisitCountry(userId);
    res.status(200).send(countries);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.removeWantToVisitController = async (req, res) => {
  const { userId, countryCode } = req.body;

  try {
    await removeWantToVisitCountry(userId, countryCode);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
