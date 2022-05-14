import { alerta } from "../misc/consoleColorido.js";
import { schemaCadastro, schemaLogin } from "../schemas/authSchemas.js";
import { perigo } from "../misc/consoleColorido.js";
import db from "../db.js";

export async function validarCadastro(req, res, next) {
  const { nome, email, senha, senha2 } = req.body;

  const { error, value } = schemaCadastro.validate({
    nome,
    email,
    senha,
    senha2,
  });

  if (error) {
    alerta(error);
    res.status(422).send(error.details[0].message);
    return;
  }

  res.locals.cadastro = value;
  next();
}

export async function validaLogin(req, res, next) {
  const { email, senha } = req.body;

  const { error, value } = schemaLogin.validate({ email, senha });

  if (error) {
    alerta(error);
    res.status(422).send(error.details[0].message);
    return;
  }

  res.locals.login = value;
  next();
}

export async function validaToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("Sessão expirada");

  try {
    const sessao = await db.collection("sessoes").findOne({ token });

    if (!sessao) return res.status(401).send("Sessão expirada");

    const user = await db.collection("usuarios").findOne({
      _id: sessao.idUsuario,
    });

    if (!user) return res.status(401).send("Sessão expirada");
    res.locals.usuario = user;
    next();
  } catch (erro) {
    perigo(`${erro} in token and user middleware`);
    return res.status(500).send("Erro interno no servidor");
  }
}
