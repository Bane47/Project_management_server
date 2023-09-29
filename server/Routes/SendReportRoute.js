const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Create a transporter using your Gmail credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "karthiynot2108@gmail.com", // Your Gmail address
    pass: "ihnsbfwigpcqfcrv", // Your Gmail password
  },
});

router.post('/sendReport', async (req, res) => {
  try {
    const { taskId, reportText, teamLeadEmail, userEmail } = req.body;

    // Create an email
    const mailOptions = {
      from: userEmail, // Sender's email address (User's email)
      to: teamLeadEmail, // Receiver's email address (Team Lead's email)
      subject: 'Task Report', // Email subject
      text: reportText, // Email body text
    };

    // Send the email
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: 'Email sent successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
