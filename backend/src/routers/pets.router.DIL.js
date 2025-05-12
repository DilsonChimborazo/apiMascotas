import { Router } from "express";
import { verifyTokenDIL } from "../controllers/auth.controller.DIL.js";
import { createPetDIL, deletePetDIL, getPetByIdDIL, getPetsDIL, getPetsGraphDIL, getPetsReportDIL, updatePetDIL } from "../controllers/pets.controller.DIL.js";
import { upload } from "../config/multer.js";


export const petRouter = Router()
petRouter.post('/petsDIL',upload.single("photo"),verifyTokenDIL,createPetDIL )
petRouter.get('/petsDIL',verifyTokenDIL, getPetsDIL )
petRouter.get('/petsReporteDIL', getPetsReportDIL )
petRouter.get('/petsGraficaDIL', getPetsGraphDIL )
petRouter.get('/petsDIL/:id',verifyTokenDIL, getPetByIdDIL )
petRouter.put('/petsDIL/:id', upload.single("photo"), verifyTokenDIL, updatePetDIL);
petRouter.delete('/petsDIL/:id',verifyTokenDIL, deletePetDIL )

