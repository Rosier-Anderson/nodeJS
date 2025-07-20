const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const { logger } = require("./middleware/logEvents");
// Create HTTP server
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");

app.use(express.urlencoded({ extended: false })); // built-in middleware for urlencoded data
app.use(express.json()); // built-in middleware for json

app.use(express.static(path.join(__dirname, "/public"))); // built-in middleware for serving static files
app.use("/subdir", express.static(path.join(__dirname, "/public"))); // static files for subdir

app.use(logger); // custom middleware for logging requests;
app.use(cors(corsOptions)); // cors middleware;

app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));

app.use("/employees", require("./routes/api/employees")); // API route

app.all("/*splat", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});
app.use(errorHandler); // error handler middleware
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${PORT}`);
});
