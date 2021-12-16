const fs = require('fs');
const list = require('./json/notification.json');

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: true});
  let promises = [];

  list.forEach((el, i) => {
    promises[i] = new Promise(async (resolve, reject) => {
      const page = await browser.newPage();

      await page.goto(el.url , {
        timeout: 0
      });

      const scrape = await page.evaluate((element) => {
        return document.querySelector(element).innerText;
      }, el.element);
      
      // Read file of this ID
      fs.readFile("id" + el.id, (err, data) => {
        // If file doesn't exist, create it
        if (err) {
          if (err.code === 'ENOENT')
            fs.writeFile("id" + el.id, scrape, (err) => {
              resolve("Notification Created for ID " + el.id);
              if (err)
                reject(err);
            });
          else reject(err);
        }
        else {
          var buf = Buffer.from(scrape);
          let changed = Buffer.compare(data, buf);

          // If change detected, write contents to file
          if (changed !== 0) {
            fs.writeFile("id" + el.id, scrape, (err) => {
              resolve("Notification sent to " + el.email);
              if (err)
                reject(err);
            });
          }
          else resolve("No Change for ID " + el.id);
        }
      });

    });
  });

  Promise.all(promises).then(data => {
    data.forEach(data => {
      console.log(data);
    });

    browser.close();
  });

})();