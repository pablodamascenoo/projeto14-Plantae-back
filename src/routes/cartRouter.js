import { Router } from "express";

import { postCarrinho } from "../controllers/cartController";
import { validaToken } from "../middlewares/authMiddleware";

const cartRouter = Router();

cartRouter.use("/carrinho", validaToken, postCarrinho);

export default cartRouter;
