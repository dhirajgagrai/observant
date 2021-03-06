require('dotenv').config();

const User = require('../models/user');
const Notification = require('../models/notification');

const scraper = require('../libs/scraper');

module.exports = async () => {
  // Get all notification jobs
  const notifList = await Notification.find();

  Promise.all(notifList.map(async (notif) => {
    const scrape = await scraper(notif.url, notif.element, notif.deep);

    // No content ID ~ Scraping first time
    if (!notif.content) {
      await notif.updateOne({ content: scrape });

      return (`\x1b[32mNOTIFICATION CREATED\x1b[0m for ${notif._id}`);
    }

    // Detecting changes
    if (scrape !== notif.content) {
      await notif.updateOne({ content: scrape });

      const user = await User.findOne({ notification: notif._id });
      return (`\x1b[32mNOTIFICATION SENT\x1b[0m to email ${user.email}`);
    }

    return (`\x1b[33mNO CHANGE\x1b[0m for notification id ${notif._id}`);
  }))
    .then((results) => {
      results.forEach((result) => {
        console.log(result);
      });
    });
};
