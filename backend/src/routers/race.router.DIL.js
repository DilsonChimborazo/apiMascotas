import { Router } from "express";
import { verifyToken } from "../controllers/auth.controller.DIL.js";
import { createRaceDIL, deleteRaceDIL, getRaceByIdDIL, getRacesDIL, updateRaceDIL } from "../controllers/races.controller.DIL.js";

export const raceRouter = Router()
raceRouter.post('/race',createRaceDIL )
raceRouter.get('/race',verifyToken, getRacesDIL )
raceRouter.get('/race/:id',verifyToken, getRaceByIdDIL )
raceRouter.put('/race/:id',verifyToken, updateRaceDIL )
raceRouter.delete('/race/:id',verifyToken, deleteRaceDIL )

