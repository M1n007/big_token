const fetch = require("node-fetch");
const cheerio = require("cheerio");
const delay = require("delay");
const readline = require("readline-sync");
const colors = require("./lib/colors");
const fs = require("async-file");
const fss = require("fs");
const { URLSearchParams } = require("url");
const moment = require("moment");

console.log("#####################");
console.log("Panggil w Amin Tamvan");
console.log("#####################");

console.log("");
console.log("");

const file = readline.question("Masukan nama file result : ");

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
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("verification_code", token);

    fetch("https://api.bigtoken.com/signup/email-verification", {
      method: "POST",
      body: params,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded ",
        "Content-Length": 387,
        Host: "api.bigtoken.com",
        Connection: "Keep-Alive",
        "Accept-Encoding": "gzip ",
        "User-Agent": "okhttp/3.14.0"
      }
    })
      .then(res => res.text())
      .then(text => {
        resolve(text);
      })
      .catch(err => reject(err));
  });

let ALL = [];

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

    const regEX = /[.-\w]+@[\w\-]{3,}(.\w{2,})+/;
    const test = array.map(ury => {
      return ury.match(regEX);
    });

    test.map(async eml => {
      if (eml !== null) {
        const regMail = /(?<=@)[^.]+.([^.]+)$/m;

        const uname = eml[0].split("@")[0];
        const domain = eml[0].match(regMail)[0];

        const email = uname + "@" + domain;

        await delay(DelaY);
        const message = await functionGetMessages(uname, domain);

        if (message === undefined) {
          console.log(
            "[" +
              " " +
              moment().format("HH:mm:ss") +
              " " +
              "]" +
              " " +
              "TOKEN EXPIRED / BELUM ADA EMAIL....."
          );
          console.log("");
          console.log("");
        } else {
          const decodeURL = await decodeURIComponent(message);
          await delay(DelaY);
          const regex = await new RegExp(/\?(?:code)\=([\S\s]*?)\&/);
          const resGex = await regex.exec(decodeURL);

          await console.log(
            "[" +
              " " +
              moment().format("HH:mm:ss") +
              " " +
              "]" +
              " " +
              "Mendapatkan token :" +
              " " +
              resGex[1]
          );
          console.log("");
          console.log("");
          const veryf = await functionVerification(email, resGex[1]);
          console.log(
            "[" +
              " " +
              moment().format("HH:mm:ss") +
              " " +
              "]" +
              " " +
              "Veryf Sukses :" +
              " " +
              uname +
              "@" +
              domain
          );
          console.log("");
          console.log("");
        }
      }
    });
  });
})();
