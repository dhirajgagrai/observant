const mongoose = require('mongoose');

const connect = async (url) => {
  const db = await mongoose.connect(url);
  console.log(`Connected to \x1b[36m${db.connection.host}\x1b[0m`);
}

exports.connect = connect;