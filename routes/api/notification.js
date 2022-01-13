const express = require('express');

const router = express.Router();

const NotifController = require('../../controllers/notification');

router.route('/')
  .get(NotifController.list)

  .post(NotifController.create)

  .put(NotifController.edit)

  .delete(NotifController.remove);

module.exports = router;
