import { Router } from "express";
import { verifyTokenDIL } from "../controllers/auth.controller.DIL.js";
import { createCategoryDIL, deleteCategoryDIL, getCategoriesDIL, getCategoryByIdDIL, updateCategoryDIL } from "../controllers/category.controller.DIL.js";

export const categoryRouter = Router()
categoryRouter.post('/categoryDIL',verifyTokenDIL,createCategoryDIL )
categoryRouter.get('/categoryDIL',verifyTokenDIL, getCategoriesDIL )
categoryRouter.get('/categoryDIL/:id',verifyTokenDIL, getCategoryByIdDIL )
categoryRouter.put('/categoryDIL/:id',verifyTokenDIL, updateCategoryDIL )
categoryRouter.delete('/categoryDIL/:id',verifyTokenDIL, deleteCategoryDIL )

