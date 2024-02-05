const puppeteer = require("puppeteer");
const fs = require("fs");

const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

(async () => {

  let cookies = fs.readFileSync('./cookies.json', 'utf8');
  cookies = JSON.parse(cookies);
  console.log(cookies);

})();
