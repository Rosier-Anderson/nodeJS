const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
// logEvents function
module.exports.logEvents = async (message) => {
  const logsPath = path.join(__dirname, "logs", "eventsLog.txt");
  const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t\t${message}\n\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(logsPath, logItem);
  } catch (err) {
    console.log(err);
  }
};

// console.log(format(new Date(), "yyyy-MM-dd\tHH:mm:ss"));
