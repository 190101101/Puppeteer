const puppeteer = require("puppeteer-extra");
const UserAgent = require("user-agents");
const fs = require("fs");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const agent = (category) => {
  const userAgent = new UserAgent({ deviceCategory: category });
  return {
    agent: userAgent.userAgent,
    height: userAgent.viewportHeight,
    width: userAgent.viewportWidth,
  };
};

const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms + Math.round(Math.random() * 5000));
  });
};

const scrapper = (data) => {
  const user = agent("desktop");
  const extension = `C:/Users/190101101/program/extension/ZenMateVPN`;

  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
      args: [
        `--disable-extensions-except=${extension}`,
        `--load-extension=${extension}`,
        // `--window-size=${user.width},${user.height}`,
      ],
    });

    try {
      await sleep(5000);
      const page = await browser.newPage();

      await page.setRequestInterception(true);
      await page.on("request", async (request) => {
        if (
          request.resourceType() === "fetch" ||
          request.resourceType() === "image" ||
          request.resourceType() === "media" ||
          request.resourceType() === "font"
        ) {
          request.abort();
        } else {
          request.continue();
        }
      });

      await page.setUserAgent(user.agent);
      // await page.setViewport({ width: user.width, height: user.height });
      await page.goto("https://www.amazon.com", { waitUntil: "networkidle2" });

      await sleep(10000);

      await page.click("#twotabsearchtextbox");
      await sleep(1000);
      await page.keyboard.type(data.keyword);
      await sleep(1000);
      await page.keyboard.press("Enter");

      await Promise.all([
        page.keyboard.press("Enter"),
        page.waitForNavigation({ waitUntil: "networkidle2" }),
      ]);

      const all_list = [];

      let status = await page.evaluate(() => {
        document.querySelector(".s-pagination-next") &&
          document
            .querySelector(".s-pagination-next")
            .classList.contains(".s-pagination-disabled");
      });

      while (!status) {
        const rows = await page.evaluate(() => {
          const data_list = [];
          document.querySelectorAll(".a-size-mini").forEach((el) => {
            try {
              data_list.push({
                name: el.textContent,
                link: el.querySelector("a")
                  ? el.querySelector("a").href
                  : false,
                asin: el.querySelector("a")
                  ? String(el.querySelector("a").href)
                      .split("/dp/")[1]
                      .split("/")[0]
                  : false,
              });
            } catch (err) {
              console.log(err);
            }
          });

          return data_list;
        });

        rows.map((row) => all_list.push(row));

        try {
          await Promise.all([
            page.waitForNavigation(".s-pagination-next"),
            page.click(".s-pagination-next"),
            page.waitForNavigation({ waitUntil: "networkidle2" }),
          ]);
        } catch (err) {}

        status = await page.evaluate(() => {
          document.querySelector(".s-pagination-next") &&
            document
              .querySelector(".s-pagination-next")
              .classList.contains(".s-pagination-disabled");
        });

        fs.writeFileSync("./data.json", JSON.stringify(all_list));
      }

      await browser.close();
      resolve(all_list);
    } catch (err) {
      console.log(err);
      await browser.close();
      const data = await scrapper(data);
      resolve(data);
    }
  });
};

scrapper({
  keyword: "rtx",
});
