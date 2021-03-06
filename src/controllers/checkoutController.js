import db from "../db.js";
import dayjs from "dayjs";
import { perigo } from "../misc/consoleColorido.js";
import { ObjectID } from "bson";

export async function postCheckout(req, res) {
  const { usuario } = res.locals;
  const { endereco, pagamento } = res.locals.info;

  try {
    const produtos = await db.collection("produtos").find({}).toArray();

    if (usuario.carrinho.length === 0)
      return res.status(401).send("o carrinho do usuário está vazio");

    const itensComprados = usuario.carrinho.map((item) => {
      const produto = produtos.find((produto) => {
        return `${produto._id}` === item.idProduto ? true : false;
      });
      return { ...produto, quantidade: item.quantidade };
    });

    if (!itensComprados[0])
      return res
        .status(404)
        .send("os itens no carrinho não existem ou estão fora do catálogo");

    const checkout = {
      idUsuario: usuario._id,
      data: dayjs().format("DD/MM/YYYY"),
      produtos: itensComprados,
      endereco: endereco,
      pagamento: pagamento,
    };

    await db.collection("checkout").insertOne(checkout);

    await db.collection("usuarios").updateOne(
      { _id: ObjectID(usuario._id) },
      {
        $set: { carrinho: [] },
      }
    );

    res.sendStatus(201);
  } catch (erro) {
    perigo(erro);
    res.status(500).send("erro interno no servidor!");
  }
}
