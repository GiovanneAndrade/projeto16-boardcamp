import { Router } from "express"
import { getCategoryController, postCategoryController } from "../controllers/categories.controller.js"
import { postcategoryMiddlewares } from "../middlewares/categories.middlewares.js"
 

const router = Router()

router.get('/categories', getCategoryController)
router.post('/categories', postcategoryMiddlewares, postCategoryController)
 


export default router