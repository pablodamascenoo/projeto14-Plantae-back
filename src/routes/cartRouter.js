import { Router } from "express";

import { postCarrinho } from "../controllers/cartController.js";
import { validaToken } from "../middlewares/authMiddleware.js";
import { validaSchemaCarrinho } from "../middlewares/cartMiddleware.js";

const cartRouter = Router();

cartRouter.post("/carrinho", validaToken, validaSchemaCarrinho, postCarrinho);

export default cartRouter;
