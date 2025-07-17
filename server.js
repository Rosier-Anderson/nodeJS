const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const { logger } = require("./middleware/logEvents");

const PORT = process.env.PORT || 3500;
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

//const server = http.createServer(app); // remove if encounted a bug in the app
// built-in middleware to handle urlencoded date
// in other words, form data:
// "contenttype : application/x-www-form-ulrencoded"
app.use(express.urlencoded({ extended: false }));
//built-in middleware for jsonå
app.use(express.json());
// serve static files to  the browser
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));
// use the logger middleware function
app.use(logger);
// validate the cors acces
const whiteList = ["http://127.0.0.1:3500", "http://localhost:3500", undefined];
const corsOption = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) ) {
        console.log(` CORS: ${origin}`);
      callback(null, true);
    } else {
        console.warn(`Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOption));
//
// end of cors access
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));
//

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
app.use(errorHandler);
// listen to changes
app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
  }
  console.log(`Server is running on port ${PORT}`);
});
