const puppeteer = require("puppeteer-extra");
const fs = require("fs");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

(async () => {
  const row = `C:/Users/190101101/program/extension/`;
  const extensions = `${row}/ZenMateVPN,${row}/ReCaptcha`;

  const browser = await puppeteer.launch({
    headless: false,
    // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    args: [
      `--disable-extensions-except=${extensions}`,
      `--load-extension=${extensions}`,
    ],
  });

  const page = await browser.newPage();

  await page.goto("https://www.google.com", { waitUntil: "networkidle2" });

  console.log("loaded");
})();
