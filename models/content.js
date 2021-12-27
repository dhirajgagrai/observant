const mongoose = require('mongoose');

const ContentModel = new mongoose.Schema(
  {
    notification: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Notification',
      required: true
    },
    text: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", ContentModel);