const express = require("express");
const fs = require("fs");
const app = express();

// 设置允许跨域访问该服务
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  // 允许携带cookie
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

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

// Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as express.json() or express.urlencoded().
// { username: 'uzi', password: 123 }
app.use(express.json()); // for parsing application/json
// username=uzi%password=123
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/login", (req, res) => {
  // 获取post请求中请求体的数据
  console.log(req.body);
  res.json({ status: 0, message: "登录成功" });
});

app.listen(3000);
