const { addVisitedCountry } = require("../models/visitedModel");

exports.addVisitedController = async (req, res) => {
  const { userId, countryCode } = req.body;

  try {
    const result = await addVisitedCountry(userId, countryCode);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
