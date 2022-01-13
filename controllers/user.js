const User = require('../models/user');

exports.list = async (req, res) => {
  const users = await User.find();

  res.send(users);
};

exports.create = async (req, res) => {
  const { email } = req.body;
  const result = await User.create({ email });
  console.log(result);

  res.send({ result: 'User Created' });
};

exports.edit = async (req, res) => {
  const { id, email } = req.body;
  await User.findByIdAndUpdate(
    id,
    { email },
    { returnDocument: 'after' },
  );

  res.send({ result: 'User Updated' });
};

exports.remove = async (req, res) => {
  const { id } = req.body;
  await User.findByIdAndDelete(id);

  res.send({ result: 'User Deleted' });
};
