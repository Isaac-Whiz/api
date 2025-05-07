import express from "express";
import OrderController from "../order/order-controller.js";

const orderController = new OrderController();
const orderRouter = express.Router();

orderRouter.get("/", (req, res) => {
  res.json(orderController.getOrders());
});

orderRouter.get("/:id", (req, res) => {
  const order = orderController.getOrderById(req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

orderRouter.post("/", (req, res) => {
  const newOrder = req.body;
  orderController.addOrder(newOrder);
  res.json(newOrder);
});

orderRouter.delete("/:id", (req, res) => {
  orderController.deleteOrder(req.params.id);
  res.json({ message: "Order deleted" });
});

orderRouter.put("/:id", (req, res) => {
  const updatedOrder = req.body;
  orderController.updateOrder(req.params.id, updatedOrder);
  res.json(updatedOrder);
});

export default orderRouter;
