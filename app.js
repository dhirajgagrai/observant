const express = require('express');

const app = express();

require('dotenv').config();

const { PORT } = process.env;

require('./models/user');
require('./models/notification');

const homeRoute = require('./routes/home');
const obsRoute = require('./routes/obs');

const notifRoute = require('./routes/api/notification');
const userRoute = require('./routes/api/user');

const db = require('./config/db');

db.connect();

app.use(express.urlencoded({ extended: false }));

app.use('/', homeRoute);
app.use('/obs', obsRoute);

app.use('/api/notification', notifRoute);
app.use('/api/user', userRoute);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}\n`);
});

process.on('SIGINT', async () => {
  await db.close();
  process.exit(0);
});
