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

const apikey = readline.question("Masukan Api Key : ");
const file = readline.question("Masukan nama file result : ");

const DelaY = readline.question(
  "Mau Berapa Lama (millisecond), semakin lama semakin besar peluang langsung verifikasi : "
);

console.log("");
console.log("");

const functionGetMessages = (email, domain) =>
  new Promise((resolve, reject) => {
    fetch(
      `https://xg3m9u4nn8.execute-api.us-east-2.amazonaws.com/big/api/v1/message?uname=${email}&domain=${domain}`,
      {
        method: "POST"
      }
    )
      .then(res => res.json())
      .then(text => {
        resolve(text.url);
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
        resolve(src);
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

    const regEX = /[.-\w]+@[\w\-]{3,}(.\w{2,})+/;
    // const test = await array.map(ury => {
    //   return ury.match(regEX);
    // });

    array.map(async eml => {
      if (eml.length > 2) {
        const regMail = /(?<=@)[^.]+.([^.]+)$/m;

        const uname = eml.substring(0, eml.lastIndexOf("@"));
        const domain = eml.substring(eml.lastIndexOf("@") + 1);

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
          } else {
            if (message < 60) {
              try {
                const getLocation = await functionGetLocation(message);

                const regex = await new RegExp(/\?(?:code)\=([\S\s]*?)\&/);
                const regexEm = await new RegExp(/[.\w]+@[\w\-]{3,}(.\w{2,})+/);
                const resGex = await regex.exec(getLocation);
                const resGexEm = await regexEm.exec(getLocation);

                await delay(DelaY);
                const veryf = await functionVerification(
                  resGexEm[0],
                  resGex[1]
                );
                if (veryf.length !== 2) {
                  console.log(veryf);
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
                const decodeURL = await decodeURIComponent(message);

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
                  console.log(veryf);

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
    });
  });
})();
