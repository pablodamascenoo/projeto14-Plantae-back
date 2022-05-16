import { Router } from "express";

import { postCarrinho , getCarrinho } from "../controllers/cartController.js";
import { validaToken } from "../middlewares/authMiddleware.js";
import { validaSchemaCarrinho } from "../middlewares/cartMiddleware.js";

const cartRouter = Router();

cartRouter.post("/carrinho", validaToken, validaSchemaCarrinho, postCarrinho);
cartRouter.get("/carrinho", getCarrinho);
export default cartRouter;
