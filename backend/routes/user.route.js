import express from "express";
import { getUser } from "../controller/user.controller.js";
import { auth } from "../middelware/auth.js";

const router=express.Router();

router.get("/users",auth,getUser);




export default router;