const test =
  "xB0QSjd4EqrwDoDK2GiaZNpwdIZndaAdKJSVmI4f6pUVJOezTtWi3IbYKrfomos1Wa4E";

const regex = new RegExp(/\?(?:code)\=([\S\s]*?)\&/);

const resGex = regex.exec(test);

console.log(test.length);
