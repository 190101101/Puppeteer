const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto("https://google.com", { waitUntil: "networkidle2" });

  let src = await page.evaluate(() => {
      return document.querySelector("img.lnXdpd").src;
    });
  });

  console.log(src);

  console.log("loaded");
})();
