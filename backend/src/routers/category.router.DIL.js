import { Router } from "express";
import { verifyToken } from "../controllers/auth.controller.DIL.js";
import { createCategoryDIL, deleteCategoryDIL, getCategoriesDIL, getCategoryByIdDIL, updateCategoryDIL } from "../controllers/category.controller.DIL.js";

export const categoryRouter = Router()
categoryRouter.post('/category',verifyToken,createCategoryDIL )
categoryRouter.get('/category',verifyToken, getCategoriesDIL )
categoryRouter.get('/category/:id',verifyToken, getCategoryByIdDIL )
categoryRouter.put('/category/:id',verifyToken, updateCategoryDIL )
categoryRouter.delete('/category/:id',verifyToken, deleteCategoryDIL )

