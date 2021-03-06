import { Router } from "express";
import { PaginaProduto, produtos } from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get("/produtos/:id", PaginaProduto);
productsRouter.get("/produtos", produtos);


export default productsRouter;
