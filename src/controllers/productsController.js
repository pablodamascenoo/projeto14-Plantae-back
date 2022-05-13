import db from "./../db.js";
import { perigo } from "../misc/consoleColorido.js";
import { ObjectID } from "bson";

export async function PaginaProduto(req, res) {
  const { id } = req.params;

  if (id.length < 24) return res.sendStatus(404);

  try {
    const produto = await db
      .collection("produtos")
      .findOne({ _id: ObjectID(id) });
    if (!produto) return res.sendStatus(404);

    return res.status(200).send(produto);
  } catch (erro) {
    res.status(500).send("erro interno no servidor, tente novamente!");
    perigo(erro);
    return;
  }
}

export async function produtos (req, res) {
  let resposta = await db.collection("produtos").find({}).toArray();
  console.log(resposta);
  res.send(resposta);

}