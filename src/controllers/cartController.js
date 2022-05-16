import db from "./../db.js";
import { perigo } from "../misc/consoleColorido.js";

export async function postCarrinho(req, res) {
  const { quantidade, idProduto } = res.locals.carrinho;
  const { usuario } = res.locals;

  try {
    let produto;

    for (let item of usuario.carrinho) {
      if (item.idProduto === idProduto) {
        produto = item.quantidade;
        break;
      }
    }

    if (produto) {
      let quantidadeNova = produto;
      quantidadeNova = (quantidadeNova * 1 + quantidade).toString();

      await db
        .collection("usuarios")
        .updateOne(
          { _id: usuario._id, "carrinho.idProduto": `${idProduto}` },
          { $set: { "carrinho.$": { idProduto, quantidade: quantidadeNova } } }
        );

      res.sendStatus(201);
      return;
    }

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
  const { usuario } = res.locals;

  res.status(200).send(usuario.carrinho);
}
