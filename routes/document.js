var express = require("express");
const DocumentController = require("../controllers/DocumentController");

var router = express.Router();

router.get("/", DocumentController.documentList);
router.post("/", DocumentController.documentStore);

module.exports = router;