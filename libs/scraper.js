const puppeteer = require('puppeteer');

module.exports = async (url, element) => {
  // Launch puppeteer
  const browser = await puppeteer.launch({ headless: true });

  // Loading page
  const page = await browser.newPage();
  await page.goto(url, {
    timeout: 0,
  });

  // Scraping
  const scrape = await page.evaluate(
    (el) => document.querySelector(el).innerText,
    element,
  );

  browser.close();

  return scrape;
};
