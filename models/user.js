const mongoose = require('mongoose');

const UserModel = new mongoose.Schema(
  {
    email: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("User" , UserModel);