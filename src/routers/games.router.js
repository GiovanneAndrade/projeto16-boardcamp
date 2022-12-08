import { Router } from "express"
import { getGamesController, postGamesController } from "../controllers/games.controller.js"
import { postGamesMiddlewares } from "../middlewares/games.middlewares.js"
 
 
 
    
const router = Router()
 
router.get('/games', getGamesController)
router.post('/games', postGamesMiddlewares, postGamesController)

 


export default router