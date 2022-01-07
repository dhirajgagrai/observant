const express = require('express');

const router = express.Router();

const Notification = require('../../models/notification');
const User = require('../../models/user');

const scraper = require('../../libs/scraper');

router.route('/')
  .get(async (req, res) => {
    const notifs = await Notification.find();

    res.send(notifs);
  })

  .post(async (req, res) => {
    const { url, element } = req.body;
    const notif = await Notification.create({ url, element });
    console.log(notif);
    const { userId } = req.body;
    const uResult = await User.findByIdAndUpdate(
      userId,
      { $push: { notification: notif._id } },
      { returnDocument: 'after' },
    );
    console.log(uResult);

    res.send({ result: 'Success' });

    const scrape = await scraper(notif.url, notif.element);
    const nResult = await notif.updateOne({ content: scrape });
    console.log(nResult);
  })

  .put(async (req, res) => {
    const { id, url, element } = req.body;
    const notif = await Notification.findByIdAndUpdate(
      id,
      { url, element },
      { returnDocument: 'after' },
    );
    console.log(notif);

    res.send({ result: 'Success' });

    const scrape = await scraper(notif.url, notif.element);
    const result = await notif.updateOne({ content: scrape });
    console.log(result);
  })

  .delete(async (req, res) => {
    const { id } = req.body;
    const result = await Notification.findByIdAndDelete(id);
    console.log(result);

    res.send({ result: 'Success' });
  });

module.exports = router;
