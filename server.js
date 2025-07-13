const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const http = require("http");
const { logEvents } = require("./logEvents");
const EventEmmiter = require("events");

// start event
class Emmiter extends EventEmmiter {}

// the server
const myEmmitter = new Emmiter();
myEmmitter.on("logs", (msg) => logEvents(msg));
const PORT = process.env.PORT || 3500;
const serveFile = async (filePath, contentType, response) => {
  try {
    const data = await fsPromises.readFile(filePath, "utf-8");
    response.writeHead(200, { "Content-Type": contentType });
    response.end(data);
  } catch (err) {
    myEmmitter.emit("logs", err);
    console.log(err);
    response.statusCode = 500;
    response.end();
  }
};
const server = http.createServer(async (req, res) => {
  myEmmitter.emit("logs", `${req.url}\t${req.method}`);
  const extension = path.extname(req.url);
  let contentType;
  console.log(req.url, req.method);
  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    case ".html":
      contentType = "text/html";
      break;
    default:
      contentType = "text/html";
      break;
  }
  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/";

  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";
  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
    serveFile(filePath, contentType, res);
  } else {
    serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
  }
});
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
