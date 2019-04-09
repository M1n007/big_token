const test =
  "https://consumer.bigtoken.com/verify?code=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3NjFmYjllNjkyYWM1YzE2ZWI2OWNiYTM5MGMyOTExNjFkOTY1ZTMzIiwiZW1haWwiOiJqZ3NwazhmenZqQHBlbmdhbmdndXJhbi5tZSIsImlzcyI6Imh0dHBzOi8vYXBpLmJpZ3Rva2VuLmNvbSIsImlhdCI6MTU1NDc5MjI4MywiZXhwIjoxNTU0Nzk1ODgzLCJuYmYiOjE1NTQ3OTIyODMsImp0aSI6InhvY1ZQQUthakxNTjZxQ0QiLCJyZWZlcnJhbF9jb2RlIjoiNDFDQU80NTcxIn0.CliqdggIXZLL8a2LyqfzOo83ibBcs7t0AdzXouZwaVk";

const regex = new RegExp(/\?(?:code)\=([\S\s]*?)\&/);

const resGex = regex.exec(test);

console.log(test.split("=")[1]);
