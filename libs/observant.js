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
  const browser = await puppeteer.launch({headless: true});

  // Get all notification jobs
  const notifList = await Notification.find();

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

      // Detecting changes | Take action accordingly
      if (notif.content == "") {
        const createContent = await Content.create({
          text: scrape
        });
        console.log(createContent);
        notif.content = createContent._id;
        await notif.save();
        resolve('\x1b[32mNOTIFICATION CREATED\x1b[0m with id ' + notif._id);
      }
      else { // Will execute even if not there in Content collection
        const textContent = await Content.findById(notif.content); // Return undefined if not in collection
        const scrapeBuffer = Buffer.from(scrape);
        const dbBuffer = Buffer.from(textContent.text);
        const change = Buffer.compare(dbBuffer, scrapeBuffer);

        /*
        Make createContent modular, and execute it below so that even if undefined data is returned 
        it will create new document and save it with new id on Notification collection
        */

        if (change) {
          textContent.text = scrape;
          await textContent.save();
          console.log(textContent);
          const user = await User.findOne({ notification : notif._id });
          resolve('\x1b[32mNOTIFICATION SENT\x1b[0m to email ' + user.email);
        }
        else {
          resolve('\x1b[33mNO CHANGE\x1b[0m for id ' + notif._id);
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

}