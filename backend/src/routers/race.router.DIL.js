import { Router } from "express";
import { verifyTokenDIL } from "../controllers/auth.controller.DIL.js";
import { createRaceDIL, deleteRaceDIL, getRaceByIdDIL, getRacesDIL, updateRaceDIL } from "../controllers/races.controller.DIL.js";

export const raceRouter = Router()
raceRouter.post('/raceDIL',verifyTokenDIL, createRaceDIL )
raceRouter.get('/raceDIL',verifyTokenDIL, getRacesDIL )
raceRouter.get('/raceDIL/:id',verifyTokenDIL, getRaceByIdDIL )
raceRouter.put('/raceDIL/:id',verifyTokenDIL, updateRaceDIL )
raceRouter.delete('/raceDIL/:id',verifyTokenDIL, deleteRaceDIL )

