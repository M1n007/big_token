const fetch = require("node-fetch");
const cheerio = require("cheerio");
const delay = require("delay");
const readline = require("readline-sync");
const colors = require("../lib/colors");
const fs = require("async-file");
const fss = require("fs");
const { URLSearchParams } = require("url");
const moment = require("moment");
const rp = require("request-promise");

console.log("#####################");
console.log("Panggil w Amin Tamvan");
console.log("#####################");

console.log("");
console.log("");

const apikey = readline.question("Masukan Api Key : ");
const file = readline.question("Masukan nama file  : ");

const DelaY = readline.question(
  "Mau Berapa Lama (millisecond), semakin lama semakin besar peluang langsung verifikasi : "
);

console.log("");
console.log("");

const functionGetMessages = (email, domain) =>
  new Promise((resolve, reject) => {
    fetch(`https://generator.email/`, {
      method: "get",
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
        "accept-encoding": "gzip, deflate, br",
        cookie: `_ga=GA1.2.1164348503.1554262465; _gid=GA1.2.905585996.1554262465; embx=%5B%22${email}%40${domain}%22%2C%22hcycl%40nongzaa.tk%22%5D; _gat=1; io=-aUNS6XIdbbHj__faWS_; surl=${domain}%2F${email}`,
        "upgrade-insecure-requests": 1,
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36"
      }
    })
      .then(res => res.text())
      .then(text => {
        const $ = cheerio.load(text);
        const src = $(".button").attr("href");
        resolve(src);
      })
      .catch(err => reject(err));
  });

const functionVerification = (email, token) =>
  new Promise((resolve, reject) => {
    fetch(
      `https://xg3m9u4nn8.execute-api.us-east-2.amazonaws.com/big/api/v1/email-verification?email=${email}&token=${token}`,
      {
        method: "POST",
        headers: { "x-api-key": `${apikey}` }
      }
    )
      .then(res => res.text())
      .then(text => {
        resolve(text);
      })
      .catch(err =>
        console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "Ada masalah sssSssstt..." +
            err
        )
      );
  });

const functionGetLocation = domain =>
  new Promise((resolve, reject) => {
    fetch(
      `https://xg3m9u4nn8.execute-api.us-east-2.amazonaws.com/big/api/v1/get-location?url=${domain}`,
      {
        method: "POST",
        headers: { "x-api-key": `${apikey}` }
      }
    )
      .then(res => res.text())
      .then(text => {
        resolve(text);
      })
      .catch(err =>
        console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "Ada masalah sssSssstt..." +
            err
        )
      );
  });

(async () => {
  console.log(
    "[" + " " + moment().format("HH:mm:ss") + " " + "]" + " " + "MEMULAI ...."
  );
  await fss.readFile(file, async function(err, data) {
    if (err) throw err;
    const array = data
      .toString()
      .replace(/\r\n|\r|\n/g, " ")
      .split(" ");

    for (let ury in array) {
      if (array[ury].length < 60) {
        const getLocation = await functionGetLocation(array[ury]);

        const regex = await new RegExp(/(?:code)\=([\S\s]*?)\&/);
        const regexEm = await new RegExp(/[.\w]+@[\w\-]{3,}(.\w{2,})+/);
        const resGex = await regex.exec(getLocation);
        const resGexEm = await regexEm.exec(getLocation);
        if (resGexEm !== null) {
          await delay(DelaY);
          const veryf = await functionVerification(resGexEm[0], resGex[1]);
          console.log(veryf);
        }
      } else {
        const decodeURL = await decodeURIComponent(array[ury]);

        const regex = await new RegExp(/\?(?:code)\=([\S\s]*?)\&/);
        const regexEm = await new RegExp(
          /([\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/
        );
        const resGex = await regex.exec(decodeURL);
        const resGexEm = await regexEm.exec(decodeURL);

        await delay(DelaY);
        const veryf = await functionVerification(resGexEm[0], resGex[1]);
        console.log(veryf);
      }
    }
  });
})();
