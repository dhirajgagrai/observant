const mongoose = require('mongoose');

const ContentModel = new mongoose.Schema(
  {
    text: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", ContentModel);