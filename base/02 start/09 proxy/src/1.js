const puppeteer = require("puppeteer");
const UserAgent = require("user-agents");

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
    args: [
      `--window-size=${user.width},${user.height}`,
      `--proxy-server=http://geo.iproyal.com:12321`,
    ],
  });

  const page = await browser.newPage();

  await page.authenticate({
    username: "zfczfc",
    password: "asdwdf3awfd_country-tr_city-konya",
  });

  await page.setUserAgent(user.agent);
  await page.setViewport({ width: user.width, height: user.height });
  await page.goto("https://ipapi.co/json", { waitUntil: "networkidle2" });

  console.log("loaded");
})();
