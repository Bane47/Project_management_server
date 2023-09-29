const express = require("express");
const EmployeeModel = require("../model/EmployeeModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt=require("bcrypt")

router.post("/forget-password", (req, res) => {

    console.log("I came inside raa")
  const { email } = req.body;
  EmployeeModel.findOne({ Email: email }).then((user) => {
    if (!user) {
        console.log("no user")
      return res.send({ Status: "User Not Exisisted" });
    }
    const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
      expiresIn: "1d",
    });
    console.log(token)

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "karthiynot2108@gmail.com",
        pass: "ihnsbfwigpcqfcrv",
      },
    });

    var mailOptions = {
      from: "karthiynot2108@gmail.com",
      to: email,
      subject: "Reset your password",
      text: `http://localhost:3000/reset_password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  });
});

router.post("/reset-password/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          EmployeeModel.findByIdAndUpdate({ _id: id }, { Password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
});

module.exports = router;
