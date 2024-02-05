const puppeteer = require("puppeteer");

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
    // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });

  const page = await browser.newPage();
  await page.goto("https://www.dosya.co", { waitUntil: "networkidle2" });

  await sleep(2000);
  const elementHandle = await page.$('[name="file_0"]');
  await elementHandle.uploadFile('C:/Users/190101101/Downloads/file.zip');
  await sleep(2000);
  await page.click('[name="submit_btn"]');

  console.log("loaded");
})();


