import { Router } from "express";
import { getCustomersController, getIdCustomersController, postCustomersController, putCustomersController } from "../controllers/customers.controller.js";
import { getIdCustomersMiddlewares, postCustomersMiddlewares } from "../middlewares/customers.middlewares.js";
 

const router = Router();

router.get("/customers", getCustomersController );
router.get("/customers/:id",getIdCustomersMiddlewares, getIdCustomersController );
router.post("/customers",postCustomersMiddlewares, postCustomersController );

 

export default router;