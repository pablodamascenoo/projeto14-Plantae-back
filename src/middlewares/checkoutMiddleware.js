import { schemaEndereco, schemaPagamento } from "../schemas/checkoutSchemas.js";
import { alerta } from "../misc/consoleColorido.js";

export async function validaEndereco(req, res, next) {
  const { address, pagamento } = req.body;

  const { error } = schemaEndereco.validate({ ...address });

  if (error) {
    alerta(error);
    return res.status(422).send(error.details[0].message);
  }

  const informacoes = {
    endereco: address,
    pagamento,
  };

  res.locals.info = informacoes;
  next();
}

export async function validaPagamento(req, res, next) {
  const { pagamento } = res.locals.info;

  const { error } = schemaPagamento.validate({ ...pagamento });

  if (error) {
    alerta(error);
    return res.status(422).send(error.details[0].message);
  }

  next();
}
