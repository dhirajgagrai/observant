const puppeteer = require('puppeteer');
const mongoose = require('mongoose');

require('dotenv').config();

const db = require('../config/db');

const User = require('../models/user');
const Notification = require('../models/notification');
const Content = require('../models/content');

exports.start = async () => {
  // Connect to database
  await db.connect();

  // Launch puppeteer
  const browser = await puppeteer.launch({ headless: true });

  // Get all notification jobs
  const notifList = await Notification.find();

  Promise.all(notifList.map(async (notif) => {
    // Loading page
    const page = await browser.newPage();
    await page.goto(notif.url, {
      timeout: 0,
    });

    // Scraping
    const scrape = await page.evaluate(
      (element) => document.querySelector(element).innerText,
      notif.element,
    );

    if (!notif.content) {
      const createContent = await Content.create({
        text: scrape,
      });

      console.log(createContent);

      await Notification.findByIdAndUpdate(notif._id, {
        content: createContent._id,
      });

      return (`\x1b[32mNOTIFICATION CREATED\x1b[0m with id ${notif._id}`);
    }

    const textContent = await Content.findById(notif.content);

    // Detecting changes : Take action accordingly
    const scrapeBuffer = Buffer.from(scrape);
    const dbBuffer = Buffer.from(textContent.text);
    const change = Buffer.compare(dbBuffer, scrapeBuffer);

    if (change) {
      textContent.text = scrape;
      await textContent.save();

      const user = await User.findOne({ notification: notif._id });
      return (`\x1b[32mNOTIFICATION SENT\x1b[0m to email ${user.email}`);
    }

    return (`\x1b[33mNO CHANGE\x1b[0m for notification id ${notif._id}`);
  }))
    .then((results) => {
      results.forEach((result) => {
        console.log(result);
      });

      console.log();
      browser.close();
      mongoose.connection.close();
    });
};
