const mongoose = require('mongoose');

const NotificationModel = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    element: {
      type: String,
      required: true,
    },
    content: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Notification', NotificationModel);
