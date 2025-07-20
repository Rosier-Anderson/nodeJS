

const whiteList = ["http://127.0.0.1:3500", "http://localhost:3500", undefined];
const corsOptions = {
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
module.exports = corsOptions;