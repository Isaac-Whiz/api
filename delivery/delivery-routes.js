import express from "express";
import DeliveryController from "../delivery/delivery-controller.js";

const delivery = new DeliveryController();
const deliveryRouter = express.Router();

deliveryRouter.get("/", (req, res) => {
  res.json(delivery.getDeliveries());
});

deliveryRouter.get("/:id", (req, res) => {
  const deliveryId = parseInt(req.params.id);
  const delivery = delivery.getDeliveryById(deliveryId);
  if (delivery) {
    res.json(delivery);
  } else {
    res.status(404).json({ error: "Delivery not found" });
  }
});

deliveryRouter.post("/", (req, res) => {
  const newDelivery = req.body;
  delivery.addDelivery(newDelivery);
  res.status(201).json(newDelivery);
});

deliveryRouter.put("/:id", (req, res) => {
  const deliveryId = parseInt(req.params.id);
  const updatedDelivery = req.body;
  delivery.updateDelivery(deliveryId, updatedDelivery);
  res.json(updatedDelivery);
});

deliveryRouter.delete("/:id", (req, res) => {
  const deliveryId = parseInt(req.params.id);
  delivery.deleteDelivery(deliveryId);
  res.sendStatus(204);
});

export default deliveryRouter;
