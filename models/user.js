const mongoose = require('mongoose');

const UserModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    notification: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Notification',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', UserModel);
