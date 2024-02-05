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

  try {
    const page = await browser.newPage();

    await page.goto("https://google.com", {
      waitUntil: "networkidle2",
    });

    await page.click('[name="q"]');

    setTimeout(async () => {
      await page.type('[name="q"]', "C");
    }, 2000);

    await page.waitForSelector(".OBMEnb .G43f7e li", { timeout: 5000});

    // await sleep(2500);

    // OBMEnb G43f7e

    console.log("loaded");
  } catch (error) {
    await browser.close();
    console.log('error');
  }
})();
