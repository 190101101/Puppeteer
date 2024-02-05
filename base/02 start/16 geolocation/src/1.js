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
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });

  const context = browser.defaultBrowserContext();
  await context.overridePermissions("https://www.maps.ie/coordinates.html", [
    "geolocation",
    ]);

  const page = await browser.newPage();

  await page.setGeolocation({ latitude: 41.015137, longitude: 28.97953 });
  await page.goto("https://www.maps.ie/coordinates.html", {
    waitUntil: "networkidle2",
  });

  console.log("loaded");
})();
