const express = require("express");
const router = express.Router();

const {handleAddAnnouncement, handleGetAnnouncements,handleDeleteAnnouncement}=require('../controller/controller.Announcement')

router.post("/Emp-Message",handleAddAnnouncement );

router.get("/Get-Message", handleGetAnnouncements);

router.delete("/delete-message/:messageId",handleDeleteAnnouncement);

module.exports = router;
