import { Router } from "express";
import {
  deleteIdRentalsController,
  getRentalsController,
  postIdRentalsController,
  postRentalsController,
} from "../controllers/rentals.controller.js";
import { 
  deleteIdRentalsMiddlewares,
  postIdRentalsMiddlewares, 
  postRentalsMiddlewares
} from "../middlewares/rentals.middlewares.js";

const router = Router();

router.get("/rentals", getRentalsController);
router.post("/rentals", postRentalsMiddlewares, postRentalsController);
router.post("/rentals/:id/return",postIdRentalsMiddlewares, postIdRentalsController);
router.delete("/rentals/:id", deleteIdRentalsMiddlewares,  deleteIdRentalsController);

export default router;
