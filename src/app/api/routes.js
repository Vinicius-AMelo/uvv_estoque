import { Router } from "express";
import { login, register } from "./login/index.js";
import { createInRecord, getInRecords } from "./estoque/index.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/records/in", getInRecords);
router.post("/records/in", createInRecord);
router.get("/records/out", getInRecords);
router.post("/records/out", createInRecord);

export default router;

