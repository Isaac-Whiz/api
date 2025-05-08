import express from "express";
import DeliveryController from "../delivery/delivery-controller.js";

const delivery = new DeliveryController();
const deliveryRouter = express.Router();

/**
 * @swagger
 * /deliveries:
 *   get:
 *     summary: Get all deliveries
 *     tags: [Deliveries]
 *     responses:
 *       200:
 *         description: List of all deliveries
 *       500:
 *         description: Server error
 */
deliveryRouter.get("/", async (req, res) => {
  try {
    const deliveries = await delivery.getDeliveries();
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /deliveries/{id}:
 *   get:
 *     summary: Get a delivery by ID
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Delivery ID
 *     responses:
 *       200:
 *         description: Delivery found
 *       404:
 *         description: Delivery not found
 *       500:
 *         description: Server error
 */
deliveryRouter.get("/:id", async (req, res) => {
  try {
    const deliveryId = parseInt(req.params.id);
    const deliveryData = await delivery.getDeliveryById(deliveryId);
    if (deliveryData) {
      res.json(deliveryData);
    } else {
      res.status(404).json({ error: "Delivery not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /deliveries:
 *   post:
 *     summary: Create a new delivery
 *     tags: [Deliveries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Delivery created successfully
 *       500:
 *         description: Server error
 */
deliveryRouter.post("/", async (req, res) => {
  try {
    const newDelivery = req.body;
    const createdDelivery = await delivery.addDelivery(newDelivery);
    res.status(201).json(createdDelivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /deliveries/{id}:
 *   put:
 *     summary: Update a delivery
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Delivery ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Delivery updated successfully
 *       404:
 *         description: Delivery not found
 *       500:
 *         description: Server error
 */
deliveryRouter.put("/:id", async (req, res) => {
  try {
    const deliveryId = parseInt(req.params.id);
    const updatedDelivery = req.body;
    const result = await delivery.updateDelivery(deliveryId, updatedDelivery);
    res.json(result);
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Delivery not found" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

/**
 * @swagger
 * /deliveries/{id}:
 *   delete:
 *     summary: Delete a delivery
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Delivery ID
 *     responses:
 *       204:
 *         description: Delivery deleted successfully
 *       404:
 *         description: Delivery not found
 *       500:
 *         description: Server error
 */
deliveryRouter.delete("/:id", async (req, res) => {
  try {
    const deliveryId = parseInt(req.params.id);
    await delivery.deleteDelivery(deliveryId);
    res.sendStatus(204);
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Delivery not found" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

export default deliveryRouter;
