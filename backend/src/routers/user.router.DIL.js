import { Router } from "express";
import { createUserDIL, deleteUserDIL, getUserByIdDIL, getUserDIL, updateUserDIL } from "../controllers/user.controller.DIL.js";
import { verifyTokenDIL } from "../controllers/auth.controller.DIL.js";

export const UserRouter = Router()
UserRouter.post('/usersDIL',createUserDIL )
UserRouter.get('/usersDIL',verifyTokenDIL, getUserDIL )
UserRouter.get('/usersDIL/:id',verifyTokenDIL, getUserByIdDIL )
UserRouter.put('/usersDIL/:id',verifyTokenDIL, updateUserDIL )
UserRouter.delete('/usersDIL/:id',verifyTokenDIL, deleteUserDIL )

