import { Router } from "express";
import { verifyToken } from "../controllers/auth.controller.DIL.js";
import { createPetDIL, deletePetDIL, getPetByIdDIL, getPetsDIL, updatePetDIL } from "../controllers/pets.controller.DIL.js";


export const petRouter = Router()
petRouter.post('/pets',createPetDIL )
petRouter.get('/pets',verifyToken, getPetsDIL )
petRouter.get('/pets/:id',verifyToken, getPetByIdDIL )
petRouter.put('/pets/:id',verifyToken, updatePetDIL )
petRouter.delete('/pets/:id',verifyToken, deletePetDIL )

