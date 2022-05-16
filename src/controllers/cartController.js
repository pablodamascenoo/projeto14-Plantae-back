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

  const { usuario } = res.locals;
  const {carrinho} = usuario;
  
  try {
    let produtos = await db.collection("produtos").find().toArray();
    
    if(carrinho.length === 0){
      return res.status(401).send("O carrinho está vazio");
    }
    produtos.map(produto => {
      carrinho.map(item => {
        if(item.idProduto === produto._id){
          console.log("Achei um item");
        }
      });
    });

    res.status(200).send(carrinho);
  } catch (erro) {
    perigo(erro);
    console.log("Erro na requisição")
    res.status(500).send(erro);
  }
}
