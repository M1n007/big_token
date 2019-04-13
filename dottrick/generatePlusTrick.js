const fetch = require("node-fetch");

const readline = require("readline-sync");
const fs = require("async-file");
const moment = require("moment");

console.log("#####################");
console.log("Panggil w Amin Tamvan");
console.log("#####################");

console.log("");
console.log("");

const EmaIl = readline.question("Masukan alamat gmail : ");
const Jumlah = readline.question("Berapa Banyak : ");

console.log("");
console.log("");

const functionRegister = email =>
  new Promise((resolve, reject) => {
    // const email = `${emol}@${domain}`;
    fetch(
      `https://x1bbuj6m1m.execute-api.us-east-2.amazonaws.com/token/api/v1/register?email=${email}&Reff=${Reff}`,
      {
        method: "post",
        headers: { "x-api-key": `${apikey}` }
      }
    )
      .then(res => res.text())
      .then(te => resolve(te))
      .catch(err => reject(err));
  });

// function* generate(email) {
//   if (email.length <= 1) {
//     yield email;
//   } else {
//     let head = email[0];
//     let tail = email.slice(1);
//     for (let item of generate(tail)) {
//       yield head + item;
//       yield head + "%2b" + item;
//     }
//   }
// }
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
  });

const genEmail = length =>
  new Promise((resolve, reject) => {
    var text = "";
    var possible =
      "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    resolve(text);
  });

const dotDot = [];
(async () => {
  console.log(
    "[" + " " + moment().format("HH:mm:ss") + " " + "]" + " " + "MEMULAI ...."
  );
  for (let index = 0; index < Jumlah; index++) {
    const uname = EmaIl.substring(0, EmaIl.lastIndexOf("@"));
    const domain = EmaIl.substring(EmaIl.lastIndexOf("@") + 1);
    const dot = await genEmail(10);
    await fs.appendFile(
      "result_plustrick.txt",
      `${uname + "%2b" + dot + "@gmail.com"}\n`,
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
        `result_plustrick.txt`
    );
  }
})();
