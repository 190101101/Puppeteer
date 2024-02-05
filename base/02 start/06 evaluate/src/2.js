const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto("https://google.com", { waitUntil: "networkidle2" });

  const text = 'test';
  let src = await page.evaluate((text) => {
    console.log(text);
    return document.querySelector('img.lnXdpd').src;
  }, text);

  console.log(src);

  console.log("loaded");
})();
