import { Router } from "express";
import { login, register } from "./login/index.js";
import { createProduct, getProducts } from "./estoque/index.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/products", getProducts);
router.post("/products", createProduct);

export default router;

