import { Router } from "express";

import { cadastro, login , produtos } from "../controllers/authController.js";
import { validaLogin, validarCadastro } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/cadastro", validarCadastro, cadastro);
authRouter.post("/login", validaLogin, login);

authRouter.get("/produtos", produtos);

export default authRouter;
