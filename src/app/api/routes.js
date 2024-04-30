import { Router } from "express";
import { auth, login, register, validateToken } from "./login/index.js";
import { createInRecord, createOutRecord, getInRecords, getOutRecords, getStock } from "./estoque/index.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/records/in", getInRecords);
router.post("/records/in", createInRecord);
router.get("/records/out", getOutRecords);
router.post("/records/out", createOutRecord);
router.get("/records/stock", getStock);
router.get("/auth", validateToken, auth);

export default router;

