import asyncHandler from "../middleware/asyncHandler.js";

// @desc   Create new order
// @route  POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  return res.send("Add order items");
});

// @desc   Get logged in user orders
// @route  GET /api/orders/my-orders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  return res.send("Get logged in user orders");
});

// @desc   Get order by ID
// @route  GET /api/orders/:id
// @access Private/Admin
const getOrderById = asyncHandler(async (req, res) => {
  return res.send("Get order by id");
});

// @desc   Update order to paid
// @route  PUT /api/orders/:id/pay
// @access Private
const udpateOrderToPaid = asyncHandler(async (req, res) => {
  return res.send("Update order to paid");
});

// @desc   Update order to delivered
// @route  PUT /api/orders/:id/pay
// @access Private/Admin
const udpateOrderToDelivered = asyncHandler(async (req, res) => {
  return res.send("Update order to delivered");
});

// @desc   Get all orders
// @route  GET /api/orders
// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  return res.send("Get all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  udpateOrderToPaid,
  udpateOrderToDelivered,
  getAllOrders,
};
