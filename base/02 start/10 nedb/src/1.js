const puppeteer = require("puppeteer");
const UserAgent = require("user-agents");
const db = require("./db.js");

const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const agent = (category) => {
  const userAgent = new UserAgent({ deviceCategory: category });
  return {
    agent: userAgent.userAgent,
    height: userAgent.viewportHeight,
    width: userAgent.viewportWidth,
  };
};

(async () => {
  const user = agent("mobile");

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    args: [`--window-size=${user.width},${user.height}`],
  });

  const page = await browser.newPage();

  await page.setUserAgent(user.agent);
  await page.setViewport({ width: user.width, height: user.height });
  await page.goto("https://ipapi.co/json", { waitUntil: "networkidle2" });

  const page_string = await page.evaluate(() => {
    return document.body.textContent;
  });

  await db.add({
    created: Date.now(),
    data: page_string,
    type: 'p1',
  });

  console.log("loaded");
  await sleep(2500);

  await browser.close();
})();
