const puppeteer = require("puppeteer-extra");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms + Math.round(Math.random() * 5000));
  });
};

const scrapper = (data_list) => {
  const extension = `C:/Users/190101101/program/extension/ZenMateVPN`;

  return new Promise(async (resolve, reject) => {
    try {
      await sleep(12000);
      const browser = await puppeteer.launch({
        headless: false,
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        args: [
          `--disable-extensions-except=${extension}`,
          `--load-extension=${extension}`,
          `--window-size=1366,768`,
        ],
      });

      const page = await browser.newPage();
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
      );
      await page.setViewport({width:1366, height:768});
      await page.goto("https://www.google.com");
    } catch (err) {
      await browser.close();
      const data = await scrapper(data_list);
      resolve(data);
    }
  });
};

scrapper();
