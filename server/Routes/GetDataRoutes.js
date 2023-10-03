const express = require("express");
const { handleEmpData, handleGetDataOne } = require("../controller/controller.getdata");
const router = express.Router();

router.get("/getEmp-data",handleEmpData );

router.get("/getEmp-dataOne",handleGetDataOne);

module.exports = router;
