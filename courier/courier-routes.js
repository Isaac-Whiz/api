import CourierController from "../courier/courier-controller.js";
import express from "express";

const courier = new CourierController();
const courierRouter = express.Router();

/**
 * @swagger
 * /couriers:
 *   get:
 *     summary: Get all couriers
 *     tags: [Couriers]
 *     responses:
 *       200:
 *         description: List of all couriers
 *       500:
 *         description: Server error
 */
courierRouter.get("/", async (req, res) => {
  try {
    const couriers = await courier.getCouriers();
    res.json(couriers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /couriers/{id}:
 *   get:
 *     summary: Get a courier by ID
 *     tags: [Couriers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Courier ID
 *     responses:
 *       200:
 *         description: Courier details
 *       404:
 *         description: Courier not found
 *       500:
 *         description: Server error
 */
courierRouter.get("/:id", async (req, res) => {
  try {
    const courierId = req.params.id;
    const courierData = await courier.getCourierById(courierId);
    if (courierData) {
      res.json(courierData);
    } else {
      res.status(404).json({ error: "Courier not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /couriers:
 *   post:
 *     summary: Create a new courier
 *     tags: [Couriers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Courier created successfully
 *       500:
 *         description: Server error
 */
courierRouter.post("/", async (req, res) => {
  try {
    const newCourier = req.body;
    const createdCourier = await courier.saveCourier(newCourier);
    res.status(201).json(createdCourier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /couriers/{id}:
 *   put:
 *     summary: Update a courier
 *     tags: [Couriers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Courier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Courier updated successfully
 *       404:
 *         description: Courier not found
 *       500:
 *         description: Server error
 */
courierRouter.put("/:id", async (req, res) => {
  try {
    const courierId = req.params.id;
    const updatedCourierData = req.body;
    const updatedCourier = await courier.updateCourier(
      courierId,
      updatedCourierData
    );
    res.json(updatedCourier);
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Courier not found" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

/**
 * @swagger
 * /couriers/{id}:
 *   delete:
 *     summary: Delete a courier
 *     tags: [Couriers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Courier ID
 *     responses:
 *       200:
 *         description: Courier deleted successfully
 *       404:
 *         description: Courier not found
 *       500:
 *         description: Server error
 */
courierRouter.delete("/:id", async (req, res) => {
  try {
    const courierId = req.params.id;
    await courier.deleteCourier(courierId);
    res.json({ message: "Courier deleted successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Courier not found" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

export default courierRouter;
