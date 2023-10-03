const express = require("express");
const { handleSendReport } = require("../controller/controller.sendreport");
const router = express.Router();

router.post("/sendReport", handleSendReport);

module.exports = router;
