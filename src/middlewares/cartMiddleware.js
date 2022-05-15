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
