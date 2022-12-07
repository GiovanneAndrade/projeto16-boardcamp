import { Router } from "express"
import { getCategoryController } from "../controllers/categories.controller.js"
 

const router = Router()

router.get('/categories', getCategoryController)
 


export default router