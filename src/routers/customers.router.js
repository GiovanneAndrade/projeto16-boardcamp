import { Router } from "express";
import { getCustomersController, postCustomersController } from "../controllers/customers.controller.js";
import { postCustomersMiddlewares } from "../middlewares/customers.middlewares.js";
 

const router = Router();

router.get("/customers", getCustomersController );
router.post("/customers",postCustomersMiddlewares, postCustomersController );
 

export default router;