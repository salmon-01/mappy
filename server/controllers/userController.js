const {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../models/userModel");

exports.createUserController = async (req, res) => {
  const { email, username, displayName, avatar } = req.body;
  try {
    const user = await createUser(email, username, displayName, avatar);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getUserController = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await getUserById(userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.updateUserController = async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;
  try {
    const user = await updateUser(userId, updates);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await deleteUser(userId);
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
