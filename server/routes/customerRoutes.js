import express from "express";
import { listCustomers,getCustomer,updateCustomer,deleteCustomer } from "../controllers/customerController.js";
import { requireAuth,requireAdmin } from "../middleware/authMiddleware.js";

const router=express.Router();
router.use(requireAuth,requireAdmin);
router.get("/",listCustomers);
router.get("/:id",getCustomer);
router.put("/:id",updateCustomer);
router.delete("/:id",deleteCustomer);
export default router;
