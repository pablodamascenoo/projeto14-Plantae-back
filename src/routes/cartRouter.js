import { Router } from "express";

import { postCarrinho } from "../controllers/cartController";
import { validaToken } from "../middlewares/authMiddleware";

const cartRouter = Router();

cartRouter.post("/carrinho", validaToken, postCarrinho);

export default cartRouter;
