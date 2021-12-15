const { url } = require('./json/url.json');
const { element } = require('./json/element.json');
const fs = require('file-system');

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  await page.goto(url , {
    timeout: 0
  });

  const scrape = await page.evaluate((element) => {
    return document.querySelector(element).innerText;
  }, element);
  
  fs.readFile('pogchamp.txt', function(err, data){
    if (err.code === 'ENOENT')
      fs.writeFile('pogchamp.txt', scrape, (err) => {
        console.log("Notification Created");
        if (err)
          console.log(err);
      });

    else if (err)
      console.log(err);

    else {
      var buf = Buffer.from(scrape);
      let changed = Buffer.compare(data, buf);
  
      if (changed !== 0) {
        fs.writeFile('pogchamp.txt', scrape, (err) => {
          console.log("Notify via Email");
          if (err)
            console.log(err);
        });
      }
      else
        console.log("No Change");
    }
  });

  await browser.close();
})();