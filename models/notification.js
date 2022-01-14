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
    deep: {
      type: Boolean,
      default: false,
    },
    content: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Notification', NotificationModel);
