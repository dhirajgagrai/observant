const express = require('express');

const router = express.Router();

const UserController = require('../../controllers/user');

router.route('/')
  .get(UserController.list)

  .post(UserController.create)

  .put(UserController.edit)

  .delete(UserController.remove);

module.exports = router;
