import chalk from "chalk";
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./db.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    chalk.bold.cyan(`
    Server is Running on port ${PORT}...
    `)
  )
);
