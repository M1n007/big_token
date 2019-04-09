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
      `https://zwlh6m2210.execute-api.us-east-2.amazonaws.com/token/api/v1/message?uname=${email}&domain=${domain}`,
      {
        method: "POST",

        headers: { "x-api-key": `${apikey}` }
      }
    )
      .then(res => res.json())
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

const functionVerification = (email, token) =>
  new Promise((resolve, reject) => {
    fetch(
      `https://zwlh6m2210.execute-api.us-east-2.amazonaws.com/token/api/v1/email-verification?email=${email}&token=${token}`,
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
      `https://zwlh6m2210.execute-api.us-east-2.amazonaws.com/token/api/v1/get-location?url=${domain}`,
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

            if (message.url === undefined) {
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
              if (message.url.length < 60) {
                try {
                  const getLocation = await functionGetLocation(message.url);

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
