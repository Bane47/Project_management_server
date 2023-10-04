const express = require("express");
const router = express.Router();
const multer = require("multer");
const util = require("util");
const fs = require("fs");
const statAsync = util.promisify(fs.stat);
const unlinkAsync = util.promisify(fs.unlink);

const { handleProfileUpdate } = require("../controller/controller.ProfileUpdate");



// Set up multer storage for profile images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // Path to your images folder
  },
  filename: function (req, file, cb) {
    // Rename the file to a unique name to avoid overwriting
    const { _id } = req.body;
    const fileName = _id + "." + file.originalname.split(".").pop();

    // Check if a file with the same name exists
    const filePath = "public/images/" + fileName;
    fs.stat(filePath, function (err, stats) {
      if (err) {
        // File does not exist, no need to delete
        cb(null, fileName);
      } else {
        // File exists, delete it before uploading the new one
        fs.unlink(filePath, function (err) {
          if (err) {
            cb(err);
          } else {
            cb(null, fileName);
          }
        });
      }
    });
  },
});



const upload = multer({ storage: storage });

router.put("/updateProfile", upload.single("profileImage"), handleProfileUpdate);

module.exports = router;
