import { Router } from "express";
import { verifyToken } from "../controllers/auth.controller.DIL.js";
import { createGenderDIL, deleteGenderDIL, getGenderByIdDIL, getGendersDIL, updateGenderDIL } from "../controllers/genders.controller.DIL.js";


export const genderRouter = Router()
genderRouter.post('/gender',createGenderDIL )
genderRouter.get('/gender',verifyToken, getGendersDIL )
genderRouter.get('/gender/:id',verifyToken, getGenderByIdDIL )
genderRouter.put('/gender/:id',verifyToken, updateGenderDIL )
genderRouter.delete('/gender/:id',verifyToken, deleteGenderDIL )

