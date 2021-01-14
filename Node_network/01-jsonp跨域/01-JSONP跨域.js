const express = require("express");
const fs = require("fs");
const app = express();
// 中间件方法 设置node_modules为静态资源目录
// src拼接 http://localhost:3000/node_modules/...
app.use(express.static("node_modules"));
app.get("/", (req, res) => {
  fs.readFile("./index.html", (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("500 Interval Serval Error!");
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(data);
  });
});
app.get("/user", (req, res) => {
  console.log(req);
  const cb = req.query.cb;
  res.end(`${cb}(${JSON.stringify({ name: "uzi" })})`);
  // res.json({ name: "uzi" });
});
app.listen(3000);
