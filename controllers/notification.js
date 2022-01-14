const Notification = require('../models/notification');
const User = require('../models/user');

const scrape = require('../services/scrape');

exports.list = async (req, res) => {
  const notifs = await Notification.find();
  res.send(notifs);
};

exports.create = async (req, res) => {
  const { url, element, userId } = req.body;
  const notif = await Notification.create({ url, element });
  await User.findByIdAndUpdate(
    userId,
    { $push: { notification: notif } },
    { returnDocument: 'after' },
  );

  res.send({ result: 'Notification Created' });

  await scrape(notif._id);
};

exports.edit = async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { id, url, element, deep } = req.body;
  const notif = await Notification.findByIdAndUpdate(
    id,
    { url, element, deep },
    { returnDocument: 'after' },
  );

  res.send({ result: 'Notification Updated' });

  await scrape(notif._id);
};

exports.remove = async (req, res) => {
  const { id } = req.body;
  await Notification.findByIdAndDelete(id);

  res.send({ result: 'Notification Deleted' });
};
