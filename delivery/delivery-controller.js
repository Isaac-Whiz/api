import Delivery from "./delivery.js";

class DeliveryController {
  constructor() {
    this.deliveries = [
      new Delivery(1, 1, "2023-05-24", "pending"),
      new Delivery(2, 2, "2023-05-24", "completed"),
      new Delivery(3, 3, "2023-05-24", "pending"),
    ];
  }
  getDeliveries() {
    return this.deliveries;
  }
  getDeliveryById(id) {
    return this.deliveries.find((delivery) => delivery._id === id);
  }
  addDelivery(delivery) {
    this.deliveries.push(delivery);
  }
  updateDelivery(id, updatedDelivery) {
    const index = this.deliveries.findIndex((delivery) => delivery._id === id);
    if (index !== -1) {
      this.deliveries[index] = updatedDelivery;
    }
  }
  deleteDelivery(id) {
    const index = this.deliveries.findIndex((delivery) => delivery._id === id);
    if (index !== -1) {
      this.deliveries.splice(index, 1);
    }
  }
}
export default DeliveryController;
