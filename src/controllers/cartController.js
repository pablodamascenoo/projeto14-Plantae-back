import db from "./../db.js";
import { perigo } from "../misc/consoleColorido.js";

export async function postCarrinho(req, res) {
  const { quantidade, idProduto } = req.body;
  const { usuario } = res.locals;

  try {
    await db
      .collection("usuarios")
      .updateOne(
        { _id: usuario._id },
        { $push: { carrinho: [{ idProduto, quantidade }] } }
      );

    res.sendStatus(201);
  } catch (erro) {
    perigo(erro);
    res.status(500).send(erro);
  }
}
