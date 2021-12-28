const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  require('../libs/observant');
  res.send('Checking for changes. See console.');
});

module.exports = router;