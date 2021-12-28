const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT;

const homeRoute = require('./routes/home');
const obsRoute = require('./routes/obs');

app.use('/', homeRoute);
app.use('/obs', obsRoute);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}\n`)
});