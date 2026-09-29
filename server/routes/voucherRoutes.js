import express from "express";
import { listVouchers,createVoucher,updateVoucher,deleteVoucher } from "../controllers/voucherController.js";
import { requireAuth,requireAdmin } from "../middleware/authMiddleware.js";

const router=express.Router();
router.get("/",listVouchers);
router.post("/",requireAuth,requireAdmin,createVoucher);
router.put("/:id",requireAuth,requireAdmin,updateVoucher);
router.delete("/:id",requireAuth,requireAdmin,deleteVoucher);
export default router;
