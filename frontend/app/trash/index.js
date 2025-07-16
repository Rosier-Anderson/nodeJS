// const { format  } = require("date-fns");
// const {v4: uuid} = require("uuid")
// console.log(format(new Date(), "yyyyMMddt\tHH:mm:ss" ))
// console.log(uuid())

// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf8",
//   (error, data) => {
//     if (error) throw error;
//     console.log(data);
//   }
// );

// it will read the file and print the content
// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "Nice to meet you",
//   (error) => {
//     if (error) throw error;
//     console.log("Write complete..");
//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "i append and create new file /n yre ",
//       (error) => {
//         if (error) throw error;
//         console.log("append complete...");
//         fs.rename(
//           path.join(__dirname, "files", "reply.txt"),
//           path.join(__dirname, "files", "neewreply.txt"),
//           (error) => {
//             if (error) throw error;
//             console.log("rename complete...");
//           }
//         );
//       }
//     );
//   }
// );
// it can also create a new file if it does not exist
// it will overwrite the file if it exists



// const http = require("http");
// const path = require("path");
// const fs = require("fs");

// const fsPromises = require("fs").promises;

// const PORT = process.env.PORT || 3500;
// const serveFile = async (filePath, contentType, response) => {
//   try {
//     const data = await fsPromises.readFile(filePath, "utf-8");
//     response.writeHead(200, { "Content-Type": contentType });
//     response.end(data);
//   } catch (err) {
//     console.log(err);
//     response.statusCode = 500;
//     response.end();
//   }
// };
// const server = http.createServer(async (req, res) => {
//   const extension = path.extname(req.url);
//   console.log(req.url, req.method);
//   let contentType;
//   switch (extension) {
//     case ".css":
//       contentType = "text/css";
//       break;
//     case ".js":
//       contentType = "text/javascript";
//       break;
//     case ".json":
//       contentType = "application/json";
//       break;
//     case ".jpg":
//       contentType = "image/jpeg";
//       break;
//     case ".png":
//       contentType = "image/png";
//       break;
//     case ".txt":
//       contentType = "text/plain";
//       break;
//     case ".html":
//       contentType = "text/html";
//       break;
//     default:
//       contentType = "text/html";
//       break;
//   }

//   let filePath =
//     contentType === "text/html" && req.url === "/"
//       ? path.join(__dirname, "views", "index.html")
//       : contentType === "text/html" && req.url.slice(-1) === "/"
//       ? path.join((__dirname, "views", req.url, "index.html"))
//       : contentType === "text/html"
//       ? path.join(__dirname, "views", req.url)
//       : path.join(__dirname, req.url);
//   if (!extension && req.url.slice(-1) !== "/") filePath += ".html";
//   //makes .html extention not required in the  browser
//   const fileExists = fs.existsSync(filePath);
//   if (fileExists) {
//     serveFile(filePath, contentType, res);
//   } else {
//     //404
//     //301
//     // redirects file folder
//     switch (path.parse(filePath).base) {
//       case "old.html":
//         res.writeHead(301, { Location: "/new-page.html" });
//         res.end();
//         break;
//         default :
//          serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
//     }
//   }
// });

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
