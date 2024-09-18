const { addVisitedCountry, getVisitedCountries } = require("../models/visitedModel");

exports.addVisitedController = async (req, res) => {
  const { userId, countryCode } = req.body;

  try {
    const result = await addVisitedCountry(userId, countryCode);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getVisitedController = async (req, res) => {
  const {userId} = req.params;

  try {
    const countries = await getVisitedCountries(userId);
    res.status(200).send(countries);
  } catch (error) {
    res.status(400).send({error: error.message})
  }
}
