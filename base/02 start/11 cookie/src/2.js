const puppeteer = require("puppeteer");
const fs = require("fs");

const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

(async () => {

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });

  const page = await browser.newPage();
  
  await page.goto("https://www.google.com", { waitUntil: "networkidle2" });
  await sleep(5000);
  
  const cookies = await page.cookies();
  console.log(cookies);

  fs.writeFileSync('./cookies.json', JSON.stringify(cookies));

  console.log("loaded");

  await sleep(5000);
  await browser.close();
})();
