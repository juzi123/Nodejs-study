// 异步：不等待 非阻塞
// 优点：性能提高，处理大量的并发请求

// CommonJS fs(fileSystem)\
// 阻塞式的
// const fs = require("fs");
// const data = fs.readFileSync("./hello.js");
// console.log(data.toString());
// console.log("123");

// 非阻塞
// const fs = require("fs");
// fs.readFile("./hello.js", function (err, data) {
//   // 错误优先机制
//   if (err) {
//     console.log(err.stack);
//     return;
//   }
//   console.log(data.toString());
// });
// console.log("123");

// promiseReadSingleFile.js
// const fs = require("fs");

// const read = (filename) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filename, "utf8", (err, data) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(data);
//     });
//   });
// };

// read("./hello.js").then(
//   (data) => {
//     console.log(data);
//   },
//   (err) => {
//     console.error("err: " + err);
//   }
// );

const fs = require("fs");
const { promisify } = require("util");
// // promisify 将 fs.readFile包装成promise对象
const readFile = promisify(fs.readFile);

// async function asyncReadFile() {
//   try {
//     const data = await readFile("./hello.js");
//     console.log(data.toString());
//   } catch (error) {
//     console.log(error.stack);
//   }
// }

// asyncReadFile();
function* read() {
  yield readFile("./hello.js");
}

let ge = read();
ge.next().value.then((data) => {
  console.log(data.toString());
});
