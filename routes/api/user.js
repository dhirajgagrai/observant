const express = require('express');

const router = express.Router();

const User = require('../../models/user');

router.route('/')
  .get(async (req, res) => {
    const users = await User.find();

    res.send(users);
  })

  .post(async (req, res) => {
    const { email } = req.body;
    const result = await User.create({ email });
    console.log(result);

    res.send({ result: 'Success' });
  })

  .put(async (req, res) => {
    const { id, email } = req.body;
    const result = await User.findByIdAndUpdate(
      id,
      { email },
      { returnDocument: 'after' },
    );
    console.log(result);

    res.send({ result: 'Success' });
  })

  .delete(async (req, res) => {
    const { id } = req.body;
    const result = await User.findByIdAndDelete(id);
    console.log(result);

    res.send({ result: 'Success' });
  });

module.exports = router;
