import express from "express";
import VendorController from "../vendor/vendor-controller.js";

const vendorController = new VendorController();
const vendorRouter = express.Router();

vendorRouter.get("/", (req, res) => {
  const vendors = vendorController.getVendors();
  res.json(vendors);
});

vendorRouter.get("/:id", (req, res) => {
  const vendor = vendorController.getVendorById(req.params.id);
  res.json(vendor);
});

vendorRouter.post("/", (req, res) => {
  const vendor = req.body;
  vendorController.saveVendor(vendor);
  res.json(vendor);
});

vendorRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedVendor = req.body;
  const vendor = vendorController.updateVendor(id, updatedVendor);
  res.json(vendor);
});

vendorRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  vendorController.deleteVendor(id);
  res.json({ message: "Vendor deleted successfully" });
});

export default vendorRouter;
