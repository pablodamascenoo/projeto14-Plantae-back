import { schemaCadastro } from "../schemas/authSchemas.js";

export async function validarCadastro(req, res, next) {
  const { nome, email, senha, senha2 } = req.body;

  const { error, value } = schemaCadastro.validate({
    nome,
    email,
    senha,
    senha2,
  });

  if (error) {
    res.status(422).send(error.details[0].message);
  }

  res.locals.cadastro = value;
  next();
}
