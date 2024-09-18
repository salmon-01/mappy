const express = require("express");
const {
  addVisitedController,
  getVisitedController,
  removeVisitedController,
} = require("../controllers/visitedController");
const router = express.Router();

router.post("/", addVisitedController);
router.get("/:userId", getVisitedController);
router.delete("/", removeVisitedController);

module.exports = router;