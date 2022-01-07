const express = require('express');

const router = express.Router();

const observant = require('../libs/observant');

router.get('/', (req, res) => {
  observant();
  res.send('Checking for changes. See console.');
});

module.exports = router;
