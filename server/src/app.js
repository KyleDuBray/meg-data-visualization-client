import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
import cors from "cors";

import usersRouter from "../routes/api/users.js";
import authRouter from "../routes/api/auth.js";

console.log();
const app = express();
app.use(express.json());
app.use(cors());

import dbConnection from "../models/db.js";

dbConnection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to MySQL database.");
});

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

const expressServer = app.listen(5000, () => {
  console.log("Listening on port 5000");
});

// Close connection on server termination
const exitHandler = (options, exitCode) => {
  console.log("Closing MySQL connection.");
  dbConnection.end();
};

//do something when app is closing
process.on("exit", exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
//process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
