const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, fileName) => {
  const logsDir = path.join(__dirname, "..", "logs");
  const logsPath = path.join(logsDir, fileName);
  const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir, { recursive: true });
    }

    await fsPromises.appendFile(logsPath, logItem);
  } catch (err) {
    console.error("Logging error:", err);
  }
};

// Express middleware logger
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  next();
};

module.exports = { logger, logEvents };
