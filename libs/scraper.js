const puppeteer = require('puppeteer');

module.exports = async (url, element) => {
  // Launch puppeteer
  const browser = await puppeteer.launch({ headless: true });

  // Loading page
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 0,
  });

  // Scraping XPath
  if (element.startsWith('/')) {
    await page.waitForXPath(element);
    const [xElement] = await page.$x(element);

    const scrape = await page.evaluate(
      (el) => el.innerText,
      xElement,
    );

    const buff = Buffer.from(scrape);
    return buff.toString('base64');
  }

  // Scraping
  const scrape = await page.evaluate(
    (el) => document.querySelector(el).innerText,
    element,
  );

  await browser.close();

  const buff = Buffer.from(scrape);
  return buff.toString('base64');
};
