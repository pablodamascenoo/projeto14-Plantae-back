import { Router } from "express";
import { PaginaProduto } from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get("/produtos/:id", PaginaProduto);

export default productsRouter;
