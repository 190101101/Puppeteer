const puppeteer = require("puppeteer");
const fs = require("fs");

const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const iPhone = puppeteer.devices['iPhone 6'];

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });

  const page = await browser.newPage();
  await page.emulate(iPhone);
  // await page.goto("https://www.google.com", { waitUntil: "networkidle2" });
  await page.goto("https://dnschecker.org/user-agent-info.php", { waitUntil: "networkidle2" });

  console.log("loaded");
})();
