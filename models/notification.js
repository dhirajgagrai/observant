const mongoose = require('mongoose');

const NotificationModel = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    element: {
      type: String,
      required: true
    },
    content: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Content'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification" , NotificationModel);