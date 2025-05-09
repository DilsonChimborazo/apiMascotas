import { Router } from "express";
import { verifyTokenDIL } from "../controllers/auth.controller.DIL.js";
import { createGenderDIL, deleteGenderDIL, getGenderByIdDIL, getGendersDIL, updateGenderDIL } from "../controllers/genders.controller.DIL.js";


export const genderRouter = Router()
genderRouter.post('/genderDIL',verifyTokenDIL, createGenderDIL )
genderRouter.get('/genderDIL',verifyTokenDIL, getGendersDIL )
genderRouter.get('/genderDIL/:id',verifyTokenDIL, getGenderByIdDIL )
genderRouter.put('/genderDIL/:id',verifyTokenDIL, updateGenderDIL )
genderRouter.delete('/genderDIL/:id',verifyTokenDIL, deleteGenderDIL )

