const mongoose = require('mongoose');

require('dotenv').config();

const connect = async () => {
  const db = await mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected to \x1b[36m${db.connection.host}\x1b[0m\n`);
};

const close = () => {
  mongoose.connection.close();
};

module.exports = { connect, close };
