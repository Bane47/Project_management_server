const express = require("express");
const router = express.Router();
const { handleForgetPassword, handleResetPassword } = require("../controller/controller.ForgetPassword");



router.post("/forget-password", handleForgetPassword);

router.post("/reset-password/:id/:token", handleResetPassword);

module.exports = router;
