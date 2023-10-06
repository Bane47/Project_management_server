const express = require("express");
const router = express.Router();
const multer = require("multer");
const util = require("util");
const fs = require("fs");
const statAsync = util.promisify(fs.stat);
const unlinkAsync = util.promisify(fs.unlink);

const { handleProfileUpdate } = require("../controller/controller.ProfileUpdate");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); 
  },
  filename: function (req, file, cb) {
    const { _id } = req.body;
    const fileName = _id + "." + file.originalname.split(".").pop();

    const filePath = "public/images/" + fileName;
    fs.stat(filePath, function (err, stats) {
      if (err) {
        cb(null, fileName);
      } else {
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
