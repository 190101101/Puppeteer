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
    executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args:[
      `--window-size=${user.width},${user.height}`,
    ]
  });

  const page = await browser.newPage();

  await page.setUserAgent(user.agent);
  await page.setViewport({ width: user.width, height: user.height });
  await page.goto(
    "https://www.google.com/search?q=what+is+my+user+agent&oq=what+is+my+user&aqs=chrome.0.0i512j69i57j0i512l8.3776j0j7&sourceid=chrome&ie=UTF-8",
    { waitUntil: "networkidle2" }
  );

  console.log("loaded");
})();
