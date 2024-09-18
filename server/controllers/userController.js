const { createUser } = require("../models/userModel");

exports.createUserController = async (req, res) => {
  const { email, username, displayName, avatar } = req.body;

  try {
    const user = await createUser(email, username, displayName, avatar);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
