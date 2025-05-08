import express from "express";
import VendorController from "../vendor/vendor-controller.js";

const vendorController = new VendorController();
const vendorRouter = express.Router();

/**
 * @swagger
 * /vendors:
 *   get:
 *     summary: Get all vendors
 *     description: Retrieve a list of all vendors
 *     responses:
 *       200:
 *         description: A list of vendors
 *       500:
 *         description: Server error
 */
vendorRouter.get("/", async (req, res) => {
  try {
    const vendors = await vendorController.getVendors();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /vendors/{id}:
 *   get:
 *     summary: Get a vendor by ID
 *     description: Retrieve a vendor by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vendor
 *     responses:
 *       200:
 *         description: A vendor object
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Server error
 */
vendorRouter.get("/:id", async (req, res) => {
  try {
    const vendor = await vendorController.getVendorById(req.params.id);
    res.json(vendor);
  } catch (error) {
    if (error.message === "Vendor not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

/**
 * @swagger
 * /vendors:
 *   post:
 *     summary: Create a new vendor
 *     description: Create a new vendor with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created vendor object
 *       500:
 *         description: Server error
 */
vendorRouter.post("/", async (req, res) => {
  try {
    const vendor = req.body;
    const newVendor = await vendorController.saveVendor(vendor);
    res.status(201).json(newVendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /vendors/{id}:
 *   put:
 *     summary: Update a vendor
 *     description: Update a vendor's information by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vendor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated vendor object
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Server error
 */
vendorRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedVendor = req.body;
    const vendor = await vendorController.updateVendor(id, updatedVendor);
    res.json(vendor);
  } catch (error) {
    if (error.message === "Vendor not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

/**
 * @swagger
 * /vendors/{id}:
 *   delete:
 *     summary: Delete a vendor
 *     description: Delete a vendor by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vendor
 *     responses:
 *       200:
 *         description: Confirmation message
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Server error
 */
vendorRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await vendorController.deleteVendor(id);
    res.json({ message: "Vendor deleted successfully" });
  } catch (error) {
    if (error.message === "Vendor not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

export default vendorRouter;
