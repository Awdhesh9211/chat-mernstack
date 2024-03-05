import express from "express";
import { getMessages, sendMessage } from "../controller/message.controller.js";
import { auth } from "../middelware/auth.js";
const router=express.Router();

router.post("/send/:id",auth,sendMessage)
router.get("/:id",auth,getMessages)

export default router;