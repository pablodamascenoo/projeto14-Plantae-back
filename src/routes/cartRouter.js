import { Router } from "express";

import {
  postCarrinho,
  getCarrinho,
  deleteItem,
} from "../controllers/cartController.js";
import { validaToken } from "../middlewares/authMiddleware.js";
import { findId, validaSchemaCarrinho } from "../middlewares/cartMiddleware.js";

const cartRouter = Router();

cartRouter.post("/carrinho", validaToken, validaSchemaCarrinho, postCarrinho);
cartRouter.get("/carrinho", validaToken, getCarrinho);
cartRouter.delete("/carrinho/:id", validaToken, findId, deleteItem);
export default cartRouter;
