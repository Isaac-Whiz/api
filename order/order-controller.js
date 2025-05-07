import Order from "./order.js";

class OrderController {
  constructor() {
    this.orders = [
      new Order(1, 1, "2023-05-24", "pending", [
        { productName: "Oranges", quantity: 2 },
        { productName: "Onions", quantity: 5 },
        { productName: "Peas", quantity: 4 },
      ]),
      new Order(2, 2, "2023-05-24", "completed", [
        { productName: "Oranges", quantity: 2 },
        { productName: "Onions", quantity: 5 },
        { productName: "Potato", quantity: 4 },
      ]),
      new Order(3, 3, "2023-05-24", "pending", [
        { productName: "Cucumber", quantity: 2 },
        { productName: "Mint", quantity: 5 },
        { productName: "Banana", quantity: 4 },
      ]),
    ];
  }

  getOrders() {
    return this.orders;
  }

  getOrderById(id) {
    return this.orders.find((order) => order.id === parseInt(id));
  }

  addOrder(order) {
    this.orders.push(order);
  }

  updateOrder(id, updatedOrder) {
    const index = this.orders.findIndex((order) => order.id === parseInt(id));
    if (index !== -1) {
      this.orders[index] = updatedOrder;
    }
  }
  deleteOrder(id) {
    const index = this.orders.findIndex((order) => order.id === parseInt(id));
    if (index !== -1) {
      this.orders.splice(index, 1);
    }
  }
}

export default OrderController;
