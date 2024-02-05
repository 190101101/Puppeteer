const puppeteer = require("puppeteer-extra");
const UserAgent = require("user-agents");
const fs = require("fs");
const db = require("./db.js");

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

const scrapper = (data_list) => {
  const user = agent("desktop");
  const extension = `C:/Users/190101101/program/extension/ZenMateVPN`;

  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
      args: [
        `--disable-extensions-except=${extension}`,
        `--load-extension=${extension}`,
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
      await page.goto("https://www.amazon.com", { waitUntil: "networkidle2" });

      await sleep(10000);

      await page.click("#twotabsearchtextbox");
      await sleep(1000);
      await page.keyboard.type(data_list.keyword);
      await sleep(1000);
      await page.keyboard.press("Enter");

      await Promise.all([
        page.keyboard.press("Enter"),
        page.waitForNavigation({ waitUntil: "networkidle2" }),
      ]);

      const all_list = [];

      let while_status = await page.evaluate(() => {
        return document.querySelector(".s-pagination-next") && document.querySelector(".s-pagination-next").classList.contains("s-pagination-disabled");
      });

      while (!while_status) {
        const data = await page.evaluate(async () => {
          const sleep = (ms) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
              }, ms + Math.round(Math.random() * 5000));
            });
          };
          const d_list = [];

          while (
            document.querySelectorAll("h2").length <= 0 ||
            !document.querySelector(".s-pagination-next")
          ) {
            await sleep(1000);
          }

          document.querySelectorAll("h2").forEach((el) => {
            try {
              d_list.push({
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

          return d_list;
        });

        await sleep(5000)
        data.map((el) => all_list.push(el));

        try {
          await Promise.all([
            page.waitForNavigation(".s-pagination-next"),
            page.click(".s-pagination-next"),
            page.waitForNavigation({ waitUntil: "networkidle2" }),
          ]);
        } catch (err) {}

        while_status = await page.evaluate(() => {
          return document.querySelector(".s-pagination-next") && document.querySelector(".s-pagination-next").classList.contains("s-pagination-disabled");
        });

        fs.writeFileSync("./data.json", JSON.stringify(all_list));
      }

      const clear_list = [];

      all_list.forEach((el) => {
        let status = false;
        clear_list.forEach((es) => {
          if (el.asin === es.asin) {
            status = true;
          }
        });

        if (el.asin.length <= 0) {
          status = true;
        }

        if (status == false) {
          clear_list.push(el);
        }
      });

      fs.writeFileSync("./data.json", JSON.stringify(all_list));
      fs.writeFileSync("./clear.json", JSON.stringify(clear_list));

      console.log(`data: ${all_list.length}`);
      console.log(`clear: ${clear_list.length}`);
      
      for(const item of clear_list){
        await db.add(item);
      }

      await browser.close();
      resolve(all_list);
    } catch (err) {
      console.log(err);
      await browser.close();
      const data = await scrapper(data_list);
      resolve(data);
    }
  });
};

scrapper({
  keyword: "rtx",
});
