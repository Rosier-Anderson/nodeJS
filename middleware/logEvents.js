const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// logEvents function
const logEvents = async (message) => {
  const logsDir = path.join(__dirname, "..", "logs");
  const logsPath = path.join(logsDir, "eventsLog.txt");
  const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    // Ensure the logs directory exists
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir, { recursive: true });
    }

    // Append the log item
    await fsPromises.appendFile(logsPath, logItem);
  } catch (err) {
    console.error("Logging error:", err);
  }
};

// Express middleware logger
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}`);
  next();
};

module.exports = { logger, logEvents };
