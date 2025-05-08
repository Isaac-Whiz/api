import express from "express";
import OrderController from "../order/order-controller.js";

const orderController = new OrderController();
const orderRouter = express.Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 *       500:
 *         description: Server error
 */
orderRouter.get("/", async (req, res) => {
  try {
    const orders = await orderController.getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
orderRouter.get("/:id", async (req, res) => {
  try {
    const order = await orderController.getOrderById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Order created successfully
 *       500:
 *         description: Server error
 */
orderRouter.post("/", async (req, res) => {
  try {
    const newOrder = req.body;
    const createdOrder = await orderController.addOrder(newOrder);
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
orderRouter.delete("/:id", async (req, res) => {
  try {
    await orderController.deleteOrder(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Order not found" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
orderRouter.put("/:id", async (req, res) => {
  try {
    const updatedOrder = req.body;
    const result = await orderController.updateOrder(
      req.params.id,
      updatedOrder
    );
    res.json(result);
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Order not found" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

export default orderRouter;
