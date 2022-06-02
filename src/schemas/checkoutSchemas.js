import Joi from "joi";

export const schemaEndereco = Joi.object({
  nome: Joi.string().required(),
  cep: Joi.string()
    .pattern(/^\d{8}$/)
    .required(),
  logradouro: Joi.string().required(),
  bairro: Joi.string().required(),
  cidade: Joi.string().required(),
  estado: Joi.string()
    .pattern(/^\w{2}$/)
    .required(),
  complemento: Joi.string().required(),
});

export const schemaPagamento = Joi.object({
  numero: Joi.string()
    .pattern(/^(\d{4})\s(\d{4})\s(\d{4})\s(\d{4})$/)
    .required(),
  cpf: Joi.string()
    .pattern(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)
    .required(),
  codigo: Joi.string()
    .pattern(/^(\d{3})$/)
    .required(),
  validade: Joi.string()
    .pattern(/^(\d{4})-(((0)[1-9])|(1)[0-2])$/)
    .required(),
});
