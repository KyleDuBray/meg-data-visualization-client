import mysql from "mysql2";
import dbConfig from "../config/db.config.js";

// Create a connection to the database
const dbConnection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  //connectionLimit: 10,
  //supportBigNumbers: true,
});

export default dbConnection;
