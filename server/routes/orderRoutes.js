import express from "express";
import { listOrders, getOrder, createOrder, updateOrderStatus } from "../controllers/orderController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, listOrders);
router.get("/:id", requireAuth, getOrder);
router.post("/", requireAuth, createOrder);
router.put("/:id/status", requireAuth, requireAdmin, updateOrderStatus);

export default router;
