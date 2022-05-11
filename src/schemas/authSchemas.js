import Joi from "joi";

export const schemaCadastro = Joi.object({
  nome: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(3).max(30).required(),
  senha2: Joi.string()
    .required()
    .valid(Joi.ref("senha"))
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});
