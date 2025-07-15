const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const { logEvents, logger } = require("./middleware/logEvents");
const PORT = process.env.PORT || 3500;

const server = http.createServer(app); // remove if encounted a bug in the app
// built-in middleware to handkle urlencoded date
// in other words, form data:
// "contenttype : application/x-www-form-ulrencoded"
//serve public file to the browser
app.use(express.static("public"));
app.use(logger)
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
