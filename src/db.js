//Configuração da conexão com o banco de dados
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const DATABASE = process.env.DATABASE;

let db = null;
const mongoClient = new MongoClient(MONGO_URI);

try {
  await mongoClient.connect();
  db = mongoClient.db(DATABASE);
} catch (error) {
  console.log(chalk.bold.red(error));
}

export default db;
