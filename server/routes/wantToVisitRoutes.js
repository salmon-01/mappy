const express = require("express");
const {
  addWantToVisitController,
  getWantToVisitController,
  removeWantToVisitController,
} = require("../controllers/wantToVisitController");
const router = express.Router();

router.post("/", addWantToVisitController);
router.get("/:userId", getWantToVisitController);
router.delete("/", removeWantToVisitController);

module.exports = router;
