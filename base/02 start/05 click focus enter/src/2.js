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
  });

  const page = await browser.newPage();

  await page.goto("https://google.com", {
    waitUntil: "networkidle2",
  });

  await page.click('[name="q"]');
  await page.type('[name="q"]', "create gmail accounts", { delay: 150 });
  await sleep(2500);

  await Promise.all([
    page.keyboard.press('Enter'),
    page.waitForNavigation({waitUntil: "networkidle2"})
  ])

  console.log("loaded");

})();
