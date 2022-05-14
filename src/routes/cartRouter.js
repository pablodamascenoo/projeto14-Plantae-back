import { Router } from "express";

import { postCarrinho } from "../controllers/cartController.js";
import { validaToken } from "../middlewares/authMiddleware.js";

const cartRouter = Router();

cartRouter.post("/carrinho", validaToken, postCarrinho);

export default cartRouter;
