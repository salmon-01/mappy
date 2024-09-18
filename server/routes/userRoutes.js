const express = require("express");
const {
  createUserController,
  getUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/userController");
const router = express.Router();

router.post("/", createUserController);
router.get("/:userId", getUserController);
router.put("/:userId", updateUserController);
router.delete("/:userId", deleteUserController);

module.exports = router;
