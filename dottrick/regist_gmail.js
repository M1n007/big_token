const fetch = require("node-fetch");
const cheerio = require("cheerio");
const delay = require("delay");
const readline = require("readline-sync");
const { URLSearchParams } = require("url");
const colors = require("../lib/colors");
const moment = require("moment");
const ua = require("useragent-generator");
const fs = require("fs");
var HttpsProxyAgent = require("https-proxy-agent");

console.log("#####################");
console.log("Panggil w Amin Tamvan");
console.log("#####################");

console.log("");
console.log("");

const apikey = "SGB-00f2b8b718";
const Reff = readline.question("Masukan Kode Referal : ");
const DelaY = readline.question("Mau Berapa Lama (millisecond) : ");
const file = readline.question("Masukan nama file list gmail :");

console.log("");
console.log("");

const functionRegister = email =>
  new Promise((resolve, reject) => {
    // const email = `${emol}@${domain}`;
    fetch(
      `https://x1bbuj6m1m.execute-api.us-east-2.amazonaws.com/token/api/v1/register?email=${email}&Reff=${Reff}`,
      {
        method: "post",
        agent: new HttpsProxyAgent("http://200.222.46.130:8080"),
        headers: { "x-api-key": `${apikey}` }
      }
    )
      .then(res => res.text())
      .then(te => resolve(te))
      .catch(err => reject(err));
  });

function* generate(email) {
  if (email.length <= 1) {
    yield email;
  } else {
    let head = email[0];
    let tail = email.slice(1);
    for (let item of generate(tail)) {
      yield head + item;
      yield head + "." + item;
    }
  }
}
const updateEmails = uname =>
  new Promise((resolve, reject) => {
    let username = "amin4udin";
    let email = "";
    //   document.getElementById("emails").value = "";
    count = 0;
    let startTime = new Date();
    for (let message of generate(uname)) {
      email += message + "@gmail.com\r\n";
      count += 1;
    }

    resolve(email);
    //   email.email.value.slice(0, -1);
    //   let endTime = new Date();
    //   let timeDiff = endTime - startTime;
    //   console.log("Finished in " + timeDiff + "ms");
  });

const dotDot = [];
(async () => {
  console.log(
    "[" + " " + moment().format("HH:mm:ss") + " " + "]" + " " + "MEMULAI ...."
  );
  // const uname = EmaIl.substring(0, EmaIl.lastIndexOf("@"));
  // const domain = EmaIl.substring(EmaIl.lastIndexOf("@") + 1);
  // const dot = await updateEmails(uname);

  // const pushDot = await dotDot.push(dot);
  // const array = await dotDot
  //   .toString()
  //   .replace(/\r\n|\r|\n/g, " ")
  //   .split(" ");
  await delay(10000);
  await fs.readFile(file, async function(err, data) {
    if (err) throw err;
    const array = data
      .toString()
      .replace(/\r\n|\r|\n/g, " ")
      .split(" ");

    for (let ury in array) {
      if (array[ury].length !== 0 && array[ury].length > 11) {
        try {
          await delay(DelaY);
          const regist = await functionRegister(array[ury]);
          await delay(5000);

          console.log(
            "[" +
              " " +
              moment().format("HH:mm:ss") +
              " " +
              "]" +
              " " +
              "EMAIL :" +
              " " +
              array[ury] +
              " " +
              " Message :" +
              " " +
              regist
          );
        } catch (e) {
          console.log(
            colors.FgRed,
            "[" +
              " " +
              moment().format("HH:mm:ss") +
              " " +
              "]" +
              " " +
              "ADA MASALAH... Mengulangi :" +
              e +
              " ",
            colors.Reset
          );
        }
      }
    }
  });
})();
