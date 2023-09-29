const express = require("express");
const router = express.Router();
const { handleLogin,handleLogout } = require("../controller/controller.signin");

// Route to handle employee login
router.post("/login", handleLogin);

router.post("/logout",handleLogout );

module.exports = router;
