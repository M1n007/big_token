const fetch = require("node-fetch");
const cheerio = require("cheerio");
const delay = require("delay");
const readline = require("readline-sync");
const { URLSearchParams } = require("url");
const colors = require("../lib/colors");
const moment = require("moment");

console.log("#####################");
console.log("Panggil w Amin Tamvan");
console.log("#####################");

console.log("");
console.log("");

const apikey = readline.question("Masukan Api Key : ");
const Reff = readline.question("Masukan Kode Referal : ");
const EmaIl = readline.question("masukan alamat gmail : ");
const DelaY = readline.question("Mau Berapa Lama (millisecond) : ");

console.log("");
console.log("");

const functionRegister = email =>
  new Promise((resolve, reject) => {
    var _0x3957 = [
      "append",
      "email",
      "password",
      "Coegsekali1!",
      "referral_id",
      "https://api.bigtoken.com/signup",
      "application/json",
      "application/x-www-form-urlencoded\x20",
      "api.bigtoken.com",
      "gzip\x20",
      "text",
      "then",
      "catch"
    ];
    (function(_0xc951b5, _0x13bf97) {
      var _0x2e2af4 = function(_0x32ae40) {
        while (--_0x32ae40) {
          _0xc951b5["push"](_0xc951b5["shift"]());
        }
      };
      _0x2e2af4(++_0x13bf97);
    })(_0x3957, 0x68);
    var _0x2b26 = function(_0x44c093, _0x559e69) {
      _0x44c093 = _0x44c093 - 0x0;
      var _0x3856b8 = _0x3957[_0x44c093];
      return _0x3856b8;
    };
    const params = new URLSearchParams();
    params[_0x2b26("0x0")](_0x2b26("0x1"), email);
    params[_0x2b26("0x0")](_0x2b26("0x2"), _0x2b26("0x3"));
    params[_0x2b26("0x0")](_0x2b26("0x4"), Reff);
    params[_0x2b26("0x0")]("monetize", 0x1);
    fetch(_0x2b26("0x5"), {
      method: "POST",
      body: params,
      headers: {
        Accept: _0x2b26("0x6"),
        "Content-Type": _0x2b26("0x7"),
        Host: _0x2b26("0x8"),
        Connection: "Keep-Alive",
        "Accept-Encoding": _0x2b26("0x9")
      }
    })
      ["then"](_0x45738a => _0x45738a[_0x2b26("0xa")]())
      [_0x2b26("0xb")](_0x4ebdb4 => resolve(_0x4ebdb4))
      [_0x2b26("0xc")](_0x1fb119 => reject(_0x1fb119));
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
  const uname = EmaIl.substring(0, EmaIl.lastIndexOf("@"));
  const domain = EmaIl.substring(EmaIl.lastIndexOf("@") + 1);
  const dot = await updateEmails(uname);

  const pushDot = await dotDot.push(dot);
  const array = await dotDot
    .toString()
    .replace(/\r\n|\r|\n/g, " ")
    .split(" ");
  await delay(10000);
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
})();
