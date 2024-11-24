import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc   Create new order
// @route  POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map(({ _id, name, qty, image, price }) => ({
        name,
        qty,
        image,
        price,
        product: item._id,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
  }

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc   Get logged in user orders
// @route  GET /api/orders/my-orders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json(orders);
});

// @desc   Get order by ID
// @route  GET /api/orders/:id
// @access Private/Admin
const getOrderById = asyncHandler(async (req, res) => {
  // order does not have user name and email, so we need to populate it
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
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
