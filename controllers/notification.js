const Notification = require('../models/notification');
const User = require('../models/user');

const Service = require('../services');

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

  await Service.addScrape(notif);
};

exports.edit = async (req, res) => {
  const { id, url, element } = req.body;
  const notif = await Notification.findByIdAndUpdate(
    id,
    { url, element },
    { returnDocument: 'after' },
  );

  res.send({ result: 'Notification Updated' });

  await Service.addScrape(notif);
};

exports.remove = async (req, res) => {
  const { id } = req.body;
  await Notification.findByIdAndDelete(id);

  res.send({ result: 'Notification Deleted' });
};
