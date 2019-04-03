const fetch = require("node-fetch");
const cheerio = require("cheerio");
const delay = require("delay");
const readline = require("readline-sync");
const colors = require("./lib/colors");
const fs = require("async-file");
const { URLSearchParams } = require("url");
const moment = require("moment");

console.log("#####################");
console.log("Panggil w Amin Tamvan");
console.log("#####################");

console.log("");
console.log("");

const Reff = readline.question("Masukan Kode Referal : ");
const LooP = readline.question("Mau Berapa Banyak ? ");
const DelaY = readline.question(
  "Mau Berapa Lama (millisecond), semakin lama semakin besar peluang langsung verifikasi : "
);

console.log("");
console.log("");

const functionRegister = (email, domain) =>
  new Promise((resolve, reject) => {
    const body = {
      password: "Coegsekali1!",
      monetize: true,
      email: `${email}@${domain}`,
      referral_id: Reff
    };

    fetch("https://api.bigtoken.com/signup", {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        Referer: "https://my.bigtoken.com/signup",
        Origin: "https://my.bigtoken.com",
        "X-Requested-With": "XMLHttpRequest",
        "X-Srax-Big-Api-Version": 2,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.text())
      .then(json => resolve(json.length))
      .catch(err => reject(err));
  });

const functionCreateEmail = (email, domain) =>
  new Promise((resolve, reject) => {
    fetch(`https://generator.email/email-generator`, {
      method: "get",
      redirect: "follow",
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
        "accept-encoding": "gzip, deflate, br",
        cookie: `_ga=GA1.2.1164348503.1554262465; _gid=GA1.2.905585996.1554262465; embx=%5B%22hcycl%40nongzaa.tk%22%5D; surl=${domain}/${email}/; io=_LbPUqg0408QUbi1aCWe`,
        "upgrade-insecure-requests": 1,
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36"
      }
    })
      .then(res => resolve("success create email"))
      .catch(err => reject(err));
  });

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
      .then(text => resolve(text))
      .catch(err => reject(err));
  });

const genEmail = length =>
  new Promise((resolve, reject) => {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    resolve(text);
  });

const domain = [
  "thinkingus24.com",
  "nongzaa.gq",
  "todayemail.ga",
  "jymfit.info",
  "mhdsl.gq",
  "geraldlover.org"
];
(async () => {
  for (let index = 0; index < LooP; index++) {
    const item = await domain[(Math.random() * domain.length) | 0];
    const emel = await genEmail(6);
    await delay(10000);
    const register = await functionRegister(emel, item);
    const email = emel + "@" + item;

    await console.log(
      "[" +
        " " +
        moment().format("HH:mm:ss") +
        " " +
        "]" +
        " " +
        "Membuat Email..."
    );

    if (register === 0) {
      await console.log(
        "[" +
          " " +
          moment().format("HH:mm:ss") +
          " " +
          "]" +
          " " +
          "Sukses register dengan email :" +
          " " +
          `${email}`
      );

      const createMail = await functionCreateEmail(emel, item);
      await console.log(
        "[" +
          " " +
          moment().format("HH:mm:ss") +
          " " +
          "]" +
          " " +
          "Mengambil Token..."
      );

      await delay(DelaY);

      const message = await functionGetMessages(emel, item);

      if (message === undefined) {
        console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "Gagal Mengambil Link..."
        );
        console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "Cek sendiri dan tunggu dalam beberapa menit/jam kedepan :" +
            " " +
            `https://generator.email/${email}`
        );
        fs.appendFile(
          "result_url.txt",
          `https://generator.email/${email} \n`,
          "utf-8"
        );
        console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "Lokasi Link :" +
            " " +
            `result_url.txt`
        );
        console.log("");
        console.log("");
      } else {
        const decodeURL = await decodeURIComponent(message);
        await delay(DelaY);
        const regex = await new RegExp(/\?(?:code)\=([\S\s]*?)\&/);

        const resGex = await regex.exec(decodeURL);

        console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "Proses Verifikasi"
        );
        const veryf = await functionVerification(email, resGex[1]);
        console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "Veryf Sukses"
        );
        console.log("");
        console.log("");
      }
    } else {
      console.log("Email Sudah Terdaftar");
      console.log("");
      console.log("");
    }
  }
})();
