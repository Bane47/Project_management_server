const express = require("express");
const router = express.Router();
const { handleLogin,handleLogout } = require("../controller/controller.signin");
const { loginValidationRules, logoutValidationRules } = require("../utils/helper.validation");


// Route to handle employee login
router.post("/login",loginValidationRules, handleLogin);

router.post("/logout",logoutValidationRules,handleLogout );

module.exports = router;
