import { Router } from "express";

import { postCheckout } from "../controllers/checkoutController.js";
import { validaToken } from "../middlewares/authMiddleware.js";

const checkoutRouter = Router();

checkoutRouter.get("/checkout", validaToken, postCheckout);

export default checkoutRouter;
