import { Router } from "express";
import { cadastro } from "../controllers/authController.js";
import { validarCadastro } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/cadastro", validarCadastro, cadastro);

export default authRouter;
