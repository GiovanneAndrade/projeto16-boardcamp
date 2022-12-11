import { Router } from "express";
import {
 
  getRentalsController,
  postIdRentalsController,
  postRentalsController,
} from "../controllers/rentals.controller.js";
import { 
  
  postIdRentalsMiddlewares, 
  postRentalsMiddlewares
} from "../middlewares/rentals.middlewares.js";

const router = Router();

router.get("/rentals", getRentalsController);
router.post("/rentals", postRentalsMiddlewares, postRentalsController);
router.post("/rentals/:id/return",postIdRentalsMiddlewares, postIdRentalsController);
 

export default router;
