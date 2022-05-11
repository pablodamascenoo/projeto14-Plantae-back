import { Router } from "express";
import { cadastro, login } from "../controllers/authController.js";
import { validaLogin, validarCadastro } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/cadastro", validarCadastro, cadastro);
authRouter.post("/login", validaLogin, login);

export default authRouter;
