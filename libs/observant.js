const puppeteer = require('puppeteer');
const mongoose = require('mongoose');

require('dotenv').config();

const db = require('../db');

const User = require('../models/user');
const Notification = require('../models/notification');
const Content = require('../models/content');

(async () => {
  // Connect to database
  await db.connect(process.env.MONGO_URI);

  // Launch puppeteer
  const browser = await puppeteer.launch({headless: true});

  // Get all notification jobs
  const notifList = await Notification.find().populate("user");

  const promises = [];
  notifList.forEach((notif, i) => {
    promises[i] = new Promise(async (resolve, reject) => {
      // Loading page
      const page = await browser.newPage();
      await page.goto(notif.url, {
        timeout: 0
      });

      // Scraping
      const scrape = await page.evaluate((element) => {
        return document.querySelector(element).innerText;
      }, notif.element);

      const textContent = await Content.findOne({ notification: notif.id });

      // Detecting changes and taking action accordingly
      if (textContent == "") {
        const create = await Content.create({
          notification: notif.id,
          text: scrape
        });
        console.log(create);
        resolve('\x1b[32mNOTIFICATION CREATED\x1b[0m for id ' + notif.id);
      }
      else {
        const scrapeBuffer = Buffer.from(scrape);
        const dbBuffer = Buffer.from(textContent.text);
        const change = Buffer.compare(dbBuffer, scrapeBuffer);

        if (change) {
          textContent.text = scrape;
          textContent.save();
          console.log(textContent);
          const email = await notif.populate("user").then((data) => { return data.user.email });
          resolve('\x1b[32mNOTIFICATION SENT\x1b[0m to email ' + email);
        }
        else {
          resolve('\x1b[33mNO CHANGE\x1b[0m for id ' + notif.id);
        }
      }
    });

  });

  Promise.all(promises).then((data) => {
    data.forEach(data => {
      console.log(data);
    });

    browser.close();
    mongoose.connection.close();
  });

})();