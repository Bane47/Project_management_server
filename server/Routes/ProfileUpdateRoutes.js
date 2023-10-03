const express = require("express");
const router = express.Router();
const multer = require("multer"); // Import multer
const path = require("path"); // Import path module
const { handleProfileUpdate } = require('../controller/controller.ProfileUpdate');

// Set up multer storage for profile images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // Path to your images folder
  },
  filename: function (req, file, cb) {
    // Rename the file to a unique name to avoid overwriting
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }); // Create multer instance

// Route to update the profile image
router.put("/updateProfile", upload.single("profileImage"), handleProfileUpdate);

module.exports = router;
