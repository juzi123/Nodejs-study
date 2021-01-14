const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

// 代理服务器操作
// 设置允许跨域访问该服务
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// http-proxy-middleware
// 中间件 将每个请求转发到指定服务器
app.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
  })
);

app.listen(8080);
