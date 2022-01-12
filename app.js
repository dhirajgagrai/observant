// Express
const express = require('express');

const app = express();

// Dotenv file
require('dotenv').config();

const { PORT } = process.env;

// Database
const db = require('./config/db');

// Cron Job
const cron = require('./libs/cron');

// Models
require('./models/user');
require('./models/notification');

// API & Routes
const homeRoute = require('./routes/home');

const obsRoute = require('./routes/api/obs');
const notifRoute = require('./routes/api/notification');
const userRoute = require('./routes/api/user');

// Connect DB and Run Cron
(async () => {
  await db.connect();
  await cron.start();
})();

// Application
app.use(express.urlencoded({ extended: false }));

app.use('/', homeRoute);

app.use('/api/obs', obsRoute);
app.use('/api/notification', notifRoute);
app.use('/api/user', userRoute);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}\n`);
});

process.on('SIGINT', async () => {
  await db.close();
  process.exit(0);
});
