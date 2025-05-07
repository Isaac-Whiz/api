import CourierController from "../courier/courier-controller.js";
import express from "express";

const courier = new CourierController();
const courierRouter = express.Router();

courierRouter.get("/", (req, res) => {
  res.json(courier.getCouriers());
});

courierRouter.get("/:id", (req, res) => {
  const courierId = req.params.id;
  const courier = courier.getCourierById(courierId);
  if (courier) {
    res.json(courier);
  } else {
    res.status(404).json({ error: "Courier not found" });
  }
});

courierRouter.post("/", (req, res) => {
  const newCourier = req.body;
  courier.saveCourier(newCourier);
  res.status(201).json(newCourier);
});

courierRouter.put("/:id", (req, res) => {
  const courierId = req.params.id;
  const updatedCourier = req.body;
  const updated = courier.updateCourier(courierId, updatedCourier);
  if (updated) {
    res.json(updatedCourier);
  } else {
    res.status(404).json({ error: "Courier not found" });
  }
});

courierRouter.delete("/:id", (req, res) => {
  const courierId = req.params.id;
  const deleted = courier.deleteCourier(courierId);
  if (deleted) {
    res.json({ message: "Courier deleted successfully" });
  } else {
    res.status(404).json({ error: "Courier not found" });
  }
});

export default courierRouter;
