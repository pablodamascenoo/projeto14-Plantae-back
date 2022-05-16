import db from "./../db.js";
import { perigo } from "../misc/consoleColorido.js";

export async function postCarrinho(req, res) {
  const { quantidade, idProduto } = res.locals.carrinho;
  const { usuario } = res.locals;

  try {
    await db
      .collection("usuarios")
      .updateOne(
        { _id: usuario._id },
        { $push: { carrinho: { idProduto, quantidade } } }
      );

    res.sendStatus(201);
  } catch (erro) {
    perigo(erro);
    res.status(500).send(erro);
  }
}

export async function getCarrinho(req, res) {
  const {email} = req.body;
  try {
    let resposta = await db.collection("usuarios").findOne({email: email});
    const {carrinho} = resposta;
    res.send(carrinho);
    //res.send("sucesso na requisição")
  }catch (erro) {
    res.send(erro);
  }
}
