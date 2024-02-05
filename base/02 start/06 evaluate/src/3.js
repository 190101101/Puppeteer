const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto("https://google.com", { waitUntil: "networkidle2" });

  let src = await page.evaluate(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const logo = document.querySelector("img.lnXdpd").src;
        resolve(logo);
      }, 3000);
    });
  });

  console.log(src);

  console.log("loaded");
})();
