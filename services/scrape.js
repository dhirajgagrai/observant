const Notification = require('../models/notification');

const scraper = require('../libs/scraper');

module.exports = async (id) => {
  const notif = await Notification.findById(id);
  const scrape = await scraper(notif.url, notif.element, notif.deep);
  return notif.updateOne({ content: scrape });
};
