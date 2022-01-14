const puppeteer = require('puppeteer');

module.exports = async (url, element, deep) => {
  // Launch puppeteer
  const browser = await puppeteer.launch({ headless: true });

  // Loading page
  const page = await browser.newPage();
  const wait = (deep) ? 'networkidle0' : 'networkidle2';
  await page.goto(url, {
    waitUntil: wait,
    timeout: 0,
  });

  // Scraping XPath
  if (element.startsWith('/')) {
    await page.waitForXPath(element);
    const [xElement] = await page.$x(element);
    const text = await page.evaluate(
      (el) => el.innerText,
      xElement,
    );

    const buff = Buffer.from(text);
    return buff.toString('base64');
  }

  // Scraping
  await page.waitForSelector(element);
  const text = await page.evaluate((el) => document.querySelector(el).innerText, element);

  await browser.close();

  const buff = Buffer.from(text);
  return buff.toString('base64');
};
