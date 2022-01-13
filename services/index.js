const scraper = require('../libs/scraper');

exports.addScrape = async (notif) => {
  const scrape = await scraper(notif.url, notif.element);
  return notif.updateOne({ content: scrape });
};
