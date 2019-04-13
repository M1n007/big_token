const fetch = require("node-fetch");
const cheerio = require("cheerio");
const delay = require("delay");
const readline = require("readline-sync");
const { URLSearchParams } = require("url");
const colors = require("../lib/colors");
const moment = require("moment");
const MailListener = require("mail-listener2");
const fs = require("async-file");

console.log("#####################");
console.log("Panggil w Amin Tamvan");
console.log("#####################");

console.log("");
console.log("");

const Reff = readline.question("Masukan Kode Referal : ");
const EmaIl = readline.question("masukan alamat gmail : ");
const password = readline.question("password : ");
const DelaY = readline.question("Mau Berapa Lama (millisecond) : ");

console.log("");
console.log("");

const functionGrabGmail = () =>
  new Promise((resole, reject) => {
    const mailListener = new MailListener({
      username: EmaIl,
      password: password,
      host: "imap.gmail.com",
      port: 993, // imap port
      tls: true,
      connTimeout: 10000, // Default by node-imap
      authTimeout: 5000, // Default by node-imap,
      debug: null, // Or your custom function with only one incoming argument. Default: null
      tlsOptions: { rejectUnauthorized: false },
      mailbox: "INBOX", // mailbox to monitor
      searchFilter: ["ALL", ["SUBJECT", "BIGtoken"]], // the search filter being used after an IDLE notification has been retrieved
      markSeen: true, // all fetched email willbe marked as seen and not fetched next time
      fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
      mailParserOptions: { streamAttachments: true } // options to be passed to mailParser lib.
    });

    mailListener.start(); // start listening

    // stop listening
    //mailListener.stop();

    // mailListener.on("server:connected", function() {
    //   console.log("imapConnected");
    // });

    // mailListener.on("server:disconnected", function() {
    //   console.log("imapDisconnected");
    // });

    mailListener.on("mail", function(mail, seqno, attributes) {
      // do something with mail object including attachments

      const $ = cheerio.load(mail.html);
      const src = $(".button").attr("href");
      if (src !== undefined && src.length !== 0) {
        fs.appendFile("result_gmail.txt", `${src}\n`, "utf-8");
        console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "Lokasi Link :" +
            " " +
            `result_gmail.txt`
        );
        resolve(src);
      }
      // mail processing code goes here
    });
  });

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

        await console.log(
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
        await delay(DelaY);
        const grab = await functionGrabGmail();
        await delay(10000);
        console.log(
          "[" +
            " " +
            moment().format("HH:mm:ss") +
            " " +
            "]" +
            " " +
            "Ter Grab :" +
            " " +
            grab +
            " " +
            "Lokasi :" +
            " " +
            `result_gmail.txt`
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
