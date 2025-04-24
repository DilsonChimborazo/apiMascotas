import { Router } from "express";
import { createUserDIL, deleteUserDIL, getUserByIdDIL, getUserDIL, updateUserDIL } from "../controllers/user.controller.DIL.js";
import { verifyToken } from "../controllers/auth.controller.DIL.js";

export const UserRouter = Router()
UserRouter.post('/users',createUserDIL )
UserRouter.get('/users',verifyToken, getUserDIL )
UserRouter.get('/users/:id',verifyToken, getUserByIdDIL )
UserRouter.put('/users/:id',verifyToken, updateUserDIL )
UserRouter.delete('/users/:id',verifyToken, deleteUserDIL )

