import { Router } from "express";

import { postCheckout } from "../controllers/checkoutController.js";
import { validaToken } from "../middlewares/authMiddleware.js";
import {
  validaEndereco,
  validaPagamento,
} from "../middlewares/checkoutMiddleware.js";

const checkoutRouter = Router();

checkoutRouter.post(
  "/checkout",
  validaToken,
  validaEndereco,
  validaPagamento,
  postCheckout
);

export default checkoutRouter;
