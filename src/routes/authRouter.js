import { Router } from "express";
import { cadastro, produtos } from "../controllers/authController.js";
import { validarCadastro } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/cadastro", validarCadastro, cadastro);

authRouter.get("/produtos", produtos);

export default authRouter;
