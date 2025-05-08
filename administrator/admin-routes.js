/**
 * @swagger
 * /admins/{id}:
 *   get:
 *     summary: Get administrator by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Administrator ID
 *     responses:
 *       200:
 *         description: Administrator found
 *       404:
 *         description: Administrator not found
 *       500:
 *         description: Server error
 */
import express from "express";
import AdminstratorController from "./administrator-controller.js";

const adminRouter = express.Router();
const admin = new AdminstratorController();

adminRouter.get("/:id", async (req, res) => {
  try {
    const administrator = await admin.getAdministratorById(req.params.id);
    if (!administrator) {
      return res.status(404).json({ error: "Administrator not found" });
    }
    res.json(administrator);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /admins:
 *   post:
 *     summary: Create a new administrator
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Administrator created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server error
 */
adminRouter.post("/", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is required" });
    }
    const newAdmin = await admin.saveAdministrator(req.body);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /admins:
 *   get:
 *     summary: Get all administrators
 *     responses:
 *       200:
 *         description: List of administrators
 *       500:
 *         description: Server error
 */
adminRouter.get("/", async (req, res) => {
  try {
    const administrators = await admin.getAdministrators();
    res.json(administrators);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /admins/{id}:
 *   put:
 *     summary: Update administrator by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Administrator ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Administrator updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Administrator not found
 *       500:
 *         description: Server error
 */
adminRouter.put("/:id", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is required" });
    }
    const updatedAdmin = await admin.updateAdministrator(
      req.params.id,
      req.body
    );
    if (!updatedAdmin) {
      return res.status(404).json({ error: "Administrator not found" });
    }
    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /admins/{id}:
 *   delete:
 *     summary: Delete administrator by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Administrator ID
 *     responses:
 *       204:
 *         description: Administrator deleted successfully
 *       404:
 *         description: Administrator not found
 *       500:
 *         description: Server error
 */
adminRouter.delete("/:id", async (req, res) => {
  try {
    await admin.deleteAdministrator(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Administrator not found" });
    }
    res.status(500).json({ error: error.message });
  }
});

export default adminRouter;
