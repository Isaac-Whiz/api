/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: List of customers
 *       500:
 *         description: Server error
 */
import express from "express";
import CustomerController from "../customer/customer-controller.js";

const customerRouter = express.Router();
const customerController = new CustomerController();

customerRouter.get("/", async (req, res) => {
  try {
    const customers = await customerController.getCustomers();
    res.json(customers);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer details
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
customerRouter.get("/:id", async (req, res) => {
  try {
    const customer = await customerController.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       500:
 *         description: Server error
 */
customerRouter.post("/", async (req, res) => {
  try {
    const customer = await customerController.saveCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
customerRouter.put("/:id", async (req, res) => {
  try {
    const customer = await customerController.updateCustomer(
      req.params.id,
      req.body
    );
    res.json(customer);
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Customer not found" });
    } else {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
});

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
customerRouter.delete("/:id", async (req, res) => {
  try {
    await customerController.deleteCustomer(req.params.id);
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Customer not found" });
    } else {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
});

export default customerRouter;
