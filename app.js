// Express
const express = require('express');

const app = express();

// Dotenv file
require('dotenv').config();

const { PORT } = process.env;

// Database
const db = require('./config/db');

const cron = require('./libs/cron');
const observant = require('./services/observant');

// Models
require('./models/user');
require('./models/notification');

// API Routes
const notifRoute = require('./api/notification');
const userRoute = require('./api/user');

// Connect DB and Run Cron
(async () => {
  await db.connect();
  cron(observant);
})();

// Application
app.use(express.urlencoded({ extended: false }));

app.use('/api/notification', notifRoute);
app.use('/api/user', userRoute);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}\n`);
});

process.on('SIGINT', async () => {
  await db.close();
  process.exit(0);
});
