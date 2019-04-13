const fetch = require("node-fetch");
const cheerio = require("cheerio");
const delay = require("delay");
const readline = require("readline-sync");
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

const apikey = readline.question("Masukan Kode SGB : ");
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
    fetch(
      `https://x1bbuj6m1m.execute-api.us-east-2.amazonaws.com/token/api/v1/email-verification?email=${email}&token=${token}`,
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
    const userAgent =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36";
    const url = `${domain}`;

    const _include_headers = function(body, response, resolveWithFullResponse) {
      return {
        headers: response.headers,
        data: body,
        finalUrl: response.request.uri.href // contains final URL
      };
    };

    const options = {
      uri: url,
      followAllRedirects: true,
      method: "get",
      gzip: true,
      transform: _include_headers,
      headers: {
        "User-Agent": userAgent
      }
    };

    const p1 = rp(options)
      .then((response, error, html) => {
        resolve(response.finalUrl);
      })
      .catch(err => reject(err));
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

    const regEX = /[.-\w]+@[\w\-]{3,}(.\w{2,})+/;
    // const test = await array.map(ury => {
    //   return ury.match(regEX);
    // });

    for (let i in array) {
      if (
        array[i].length !== null &&
        array[i].length !== 2 &&
        array[i].length > 2
      ) {
        console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "MENCOBA :" +
            " " +
            array[i]
        );
        if (array[i].length > 2) {
          const regMail = /(?<=@)[^.]+.([^.]+)$/m;

          const uname = array[i].substring(0, array[i].lastIndexOf("@"));
          const domain = array[i].substring(array[i].lastIndexOf("@") + 1);

          if (uname.includes("generator")) {
            const unem = uname.split("/")[3];

            await delay(DelaY);
            const message = await functionGetMessages(unem, domain);

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
              if (message.length < 60) {
                try {
                  const getLocation = await functionGetLocation(message);

                  const regex = await new RegExp(/\?(?:code)\=([\S\s]*?)\&/);
                  const regexEm = await new RegExp(
                    /[.\w]+@[\w\-]{3,}(.\w{2,})+/
                  );
                  const resGex = await regex.exec(getLocation);
                  const resGexEm = await regexEm.exec(getLocation);

                  await delay(DelaY);
                  const veryf = await functionVerification(
                    resGexEm[0],
                    resGex[1]
                  );

                  if (veryf.length > 2) {
                    console.log(
                      "[" +
                        " " +
                        moment().format("HH:mm:ss") +
                        " " +
                        "]" +
                        " " +
                        "message :" +
                        " " +
                        veryf
                    );
                    console.log("");
                    console.log("");
                  }
                  // const msg = JSON.parse(veryf).error.status;

                  // if (JSON.parse(veryf).hasOwnProperty("error")) {
                  //   console.log(
                  //     "[" +
                  //       " " +
                  //       moment().format("HH:mm:ss") +
                  //       " " +
                  //       "]" +
                  //       " " +
                  //       `Email : ${resGexEm[0]}` +
                  //       " " +
                  //       "Token Expired"
                  //   );
                  // } else {
                  //   console.log(
                  //     "[" +
                  //       " " +
                  //       moment().format("HH:mm:ss") +
                  //       " " +
                  //       "]" +
                  //       " " +
                  //       `Email : ${resGexEm[0]}` +
                  //       " " +
                  //       "Veryf Sukses"
                  //   );
                  // }
                } catch (e) {
                  console.log("Ada error mengulangi....");
                  console.log("");
                  console.log("");
                }
              } else {
                try {
                  const decodeURL = await decodeURIComponent(message.url);

                  const regex = await new RegExp(/\?(?:code)\=([\S\s]*?)\&/);
                  const regexEm = await new RegExp(
                    /([\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/
                  );
                  const resGex = await regex.exec(decodeURL);
                  const resGexEm = await regexEm.exec(decodeURL);

                  if (resGexEm !== null) {
                    await delay(DelaY);
                    const veryf = await functionVerification(
                      resGexEm[0],
                      resGex[1]
                    );
                    // const msg = JSON.parse(veryf).error.status;
                    if (veryf.length > 2) {
                      console.log(
                        "[" +
                          " " +
                          moment().format("HH:mm:ss") +
                          " " +
                          "]" +
                          " " +
                          "message :" +
                          " " +
                          veryf
                      );
                      console.log("");
                      console.log("");
                    }
                    // if (JSON.parse(veryf).hasOwnProperty("error")) {
                    //   console.log(
                    //     "[" +
                    //       " " +
                    //       moment().format("HH:mm:ss") +
                    //       " " +
                    //       "]" +
                    //       " " +
                    //       `Email : ${resGexEm[0]}` +
                    //       " " +
                    //       "Token Expired"
                    //   );
                    // } else {
                    //   console.log(
                    //     "[" +
                    //       " " +
                    //       moment().format("HH:mm:ss") +
                    //       " " +
                    //       "]" +
                    //       " " +
                    //       `Email : ${resGexEm[0]}` +
                    //       " " +
                    //       "Veryf Sukses"
                    //   );
                    // }
                  }
                } catch (e) {
                  console.log("Ada error mengulangi....");
                  console.log("");
                  console.log("");
                }
              }
            }
          }
        }
      }
    }
  });
})();
