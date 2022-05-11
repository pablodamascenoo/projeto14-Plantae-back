import { alerta } from "../misc/consoleColorido.js";
import { schemaCadastro, schemaLogin } from "../schemas/authSchemas.js";

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
