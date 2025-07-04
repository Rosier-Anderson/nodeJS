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

