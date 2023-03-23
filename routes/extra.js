var express = require("express");
const ExtraController = require("../controllers/ExtraController");

var router = express.Router();

router.get("/", ExtraController.Get);
router.post("/", ExtraController.Store);

module.exports = router;