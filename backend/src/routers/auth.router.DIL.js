import { Router } from "express";
import { loginUserDIL } from "../controllers/auth.controller.DIL.js";



export const LoginRouter = Router()
LoginRouter.post('/login',loginUserDIL)