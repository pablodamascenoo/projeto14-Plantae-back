import Joi from "joi";

export const schemaCarrinho = Joi.object({
  quantidade: Joi.number().min(1).required(),
  idProduto: Joi.string().length(24).required(),
});
