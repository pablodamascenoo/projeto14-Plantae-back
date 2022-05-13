//Operações (insert, find e delete) com o banco de dados
import chalk from "chalk";
import db from "./../db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { alerta, sucesso, perigo } from "../misc/consoleColorido.js";
import pkg from 'joi';
const { func } = pkg;

export async function cadastro(req, res) {
  const { nome, email, senha } = res.locals.cadastro;

  try {
    const senhaEncriptada = bcrypt.hashSync(senha, 10);
    if (await db.collection("usuarios").findOne({ email })) {
      alerta("email já cadastrado");
      return res.status(409).send("email já cadastrado");
    }
    await db.collection("usuarios").insertOne({
      nome,
      email,
      senha: senhaEncriptada,
      carrinho: [],
    });
    return res.sendStatus(201);
  } catch (erro) {
    res.status(500).send("erro interno no servidor, tente novamente!");
    perigo(erro);
  }
}

export async function produtos (req, res) {
  let resposta = await db.collection("produtos").find({}).toArray();
  console.log(resposta);
  res.send(resposta);

}