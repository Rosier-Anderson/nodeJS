const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const { logEvents, logger } = require("./middleware/logEvents");
const PORT = process.env.PORT || 3500;
const cors = require("cors");

const server = http.createServer(app); // remove if encounted a bug in the app
// built-in middleware to handle urlencoded date
// in other words, form data:
// "contenttype : application/x-www-form-ulrencoded"
app.use(express.urlencoded({ extended: false }));
//built-in middleware for json
app.use(express.json());
// serve static files to  the browser
app.use(express.static("public"));
// use the logger middleware function
app.use(logger);
// validate the cors acces
const whiteList = [

  "http://127.0.0.1:3500",
  "http://localhost:3500",
];
const corsOption = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by corssss"));
    }
  },
  optionsSuccesStatus: 200,
};
app.use(cors(corsOption));
app.get(/^\$|\/index(\.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
  console.log(req.method, req.url);
});
app.get(/^\/new-page(\.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});
app.get("/old-page", (req, res) => {
  res.redirect(301, "/new-page");
});
app.get("/*splat", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
// listen to changes
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${PORT}`);
});
