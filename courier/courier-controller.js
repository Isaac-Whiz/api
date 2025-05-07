import Courier from "./courier.js";

class CourierController {
  constructor() {
    this.couriers = [
      new Courier(
        1,
        "John",
        "Doe",
        "john.doe@example.com",
        "password123",
        "courier",
        "available"
      ),
      new Courier(
        2,
        "Jane",
        "Smith",
        "jane.smith@example.com",
        "password456",
        "courier",
        "busy"
      ),
      new Courier(
        3,
        "Bob",
        "Johnson",
        "bob.johnson@example.com",
        "password789",
        "courier",
        "available"
      ),
    ];
  }

  getCouriers() {
    return this.couriers;
  }
  getCourierById(id) {
    return this.couriers.find((courier) => courier._id === this.#parseId(id));
  }
  saveCourier(courier) {
    this.couriers.push(courier);
  }
  updateCourier(id, updatedCourier) {
    const index = this.couriers.findIndex(
      (courier) => courier._id === this.#parseId(id)
    );
    if (index !== -1) {
      this.couriers[index] = updatedCourier;
    }
  }
  deleteCourier(id) {
    const index = this.couriers.findIndex(
      (courier) => courier._id === this.#parseId(id)
    );
    if (index !== -1) {
      this.couriers.splice(index, 1);
    }
  }

  #parseId(id) {
    return parseInt(id);
  }
}

export default CourierController;
