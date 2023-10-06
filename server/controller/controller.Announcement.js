const messageModel = require("../model/EmployeeAnnouncementModel");

const handleAddAnnouncement = async (req, res) => {
  try {
    const { message } = req.body;

    const Saved_Message = await messageModel.create({
      message,
    });

    res.status(200).json(Saved_Message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const handleGetAnnouncements = async (req, res) => {
  try {
    const message = await messageModel.find();
    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const handleDeleteAnnouncement = async (req, res) => {
  try {
    const messageId = req.params.messageId;

    const deleteMessage = await messageModel.findByIdAndUpdate(
      messageId,
      { $set: { deleted: true } },
      { new: true }
    );

    if (!deleteMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json({ message: "Message deleted" });
  } catch (error) {
    console.log(error);
    req.status(500).json({ message: "Server Error Occured" });
  }
};

module.exports = {
  handleAddAnnouncement,
  handleGetAnnouncements,
  handleDeleteAnnouncement,
};
