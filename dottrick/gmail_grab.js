const MailListener = require("mail-listener2");
const cheerio = require("cheerio");
const fs = require("async-file");
const moment = require("moment");
const readline = require("readline-sync");

console.log("#####################");
console.log("Panggil w Amin Tamvan");
console.log("#####################");

console.log("");
console.log("");

const emel = readline.question("Masukan username / email gmail : ");
const password = readline.question("Masukan Password : ");

const mailListener = new MailListener({
  username: emel,
  password: password,
  host: "imap.gmail.com",
  port: 993, // imap port
  tls: true,
  connTimeout: 10000, // Default by node-imap
  authTimeout: 5000, // Default by node-imap,
  debug: console.log, // Or your custom function with only one incoming argument. Default: null
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

mailListener.on("server:connected", function() {
  console.log("imapConnected");
});

mailListener.on("server:disconnected", function() {
  console.log("imapDisconnected");
});

mailListener.on("mail", function(mail, seqno, attributes) {
  // do something with mail object including attachments

  const $ = cheerio.load(mail.html);
  const src = $(".button").attr("href");
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
  // mail processing code goes here
});
