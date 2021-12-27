const mongoose = require('mongoose');

const NotificationModel = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  url: {
    type: String,
    required: true
  },
  element: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Notification" , NotificationModel);