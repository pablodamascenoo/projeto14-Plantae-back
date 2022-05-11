import { Router } from "express";
import { cadastro } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/cadastro", cadastro);

export default authRouter;
