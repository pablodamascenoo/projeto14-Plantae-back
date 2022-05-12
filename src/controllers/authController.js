import chalk from "chalk";
import db from "./../db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { alerta, sucesso, perigo } from "../misc/consoleColorido.js";

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

export async function login(req, res) {
  const { email, senha } = res.locals.login;

  try {
    const usuario = await db.collection("usuarios").findOne({ email });

    if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
      const token = uuid();
      await db.collection("sessoes").insertOne({
        idUsuario: usuario._id,
        token,
      });

      return res.status(200).send({ token, nome: usuario.nome });
    } else {
      alerta("email e/ou senha incorretos!");
      res.status(401).send("email e/ou senha incorretos!");
      return;
    }
  } catch (erro) {
    res.status(500).send("erro interno no servidor, tente novamente!");
    perigo(erro);
    return;
  }
}
