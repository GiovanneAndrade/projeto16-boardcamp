import { Router } from "express";
import {
 
  getRentalsController,
 
  postRentalsController,
} from "../controllers/rentals.controller.js";
import { 
 
  postRentalsMiddlewares
} from "../middlewares/rentals.middlewares.js";

const router = Router();

router.get("/rentals", getRentalsController);
router.post("/rentals", postRentalsMiddlewares, postRentalsController);


export default router;
