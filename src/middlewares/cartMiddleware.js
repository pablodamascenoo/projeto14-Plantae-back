import { schemaCarrinho } from "../schemas/cartSchemas.js";
import { alerta } from "../misc/consoleColorido.js";

export async function validaSchemaCarrinho(req, res, next) {
  const { quantidade, idProduto } = req.body;

  const { error, value } = schemaCarrinho.validate({ quantidade, idProduto });

  if (error) {
    alerta(error);
    return res.status(422).send(error.details[0].message);
  }

  res.locals.carrinho = value;
  next();
}

export async function findId(req, res, next) {
  const { id } = req.params;
  const { usuario } = res.locals;

  for (let item of usuario.carrinho) {
    if (item.idProduto === id) {
      res.locals.id = id;
      return next();
    }
  }

  return res.sendStatus(404);
}
