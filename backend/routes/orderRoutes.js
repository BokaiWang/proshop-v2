import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOrderById,
  udpateOrderToDelivered,
  udpateOrderToPaid,
} from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getAllOrders);
router.route("/my-orders").get(protect, getMyOrders);
router.route("/:id").get(protect, admin, getOrderById);
router.route("/:id/pay").put(protect, udpateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, udpateOrderToDelivered);

export default router;
