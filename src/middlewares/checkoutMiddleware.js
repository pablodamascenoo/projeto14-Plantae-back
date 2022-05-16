import { schemaEndereco, schemaPagamento } from "../schemas/checkoutSchemas";
import { alerta } from "../misc/consoleColorido";

export async function validaEndereco(req, res, next) {
  const { endereco, pagamento } = req.body;

  const { error } = schemaEndereco.validate({ ...endereco });

  if (error) {
    alerta(error);
    return res.status(422).send(error.details[0].message);
  }

  const informacoes = {
    endereco,
    pagamento,
  };

  res.locals.info = informacoes;
  next();
}

export async function validaPagamento(req, res, next) {
  const { informacoes } = res.locals.info;

  const { error } = schemaPagamento.validate({ ...informacoes.pagamento });

  if (error) {
    alerta(error);
    return res.status(422).send(error.details[0].message);
  }

  next();
}
