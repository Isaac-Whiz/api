import Customer from "./customer.js";

class CustomerController {
  constructor() {
    this.customers = [
      new Customer(
        1,
        "John",
        "Doe",
        "john@example.com",
        "password123",
        "customer",
        "1234567890",
        "123 Main St",
        "New York",
        "NY",
        "USA"
      ),
      new Customer(
        2,
        "Jane",
        "Smith",
        "jane@example.com",
        "password456",
        "customer",
        "9876543210",
        "456 Elm St",
        "Los Angeles",
        "CA",
        "USA"
      ),
      new Customer(
        3,
        "Bob",
        "Johnson",
        "bob@example.com",
        "password789",
        "customer",
        "5555555555",
        "789 Oak St",
        "Chicago",
        "IL",
        "USA"
      ),
    ];
  }

  getCustomers() {
    return this.customers;
  }

  getCustomerById(id) {
    return this.customers.find(
      (customer) => customer._id === this.#parseId(id)
    );
  }

  saveCustomer(customer) {
    this.customers.push(customer);
  }

  updateCustomer(id, updatedCustomer) {
    const index = this.customers.findIndex(
      (customer) => customer._id === this.#parseId(id)
    );
    this.customers[index] = updatedCustomer;
  }

  deleteCustomer(id) {
    const index = this.customers.findIndex(
      (customer) => customer._id === this.#parseId(id)
    );
    this.customers.splice(index, 1);
  }

  #parseId(id) {
    const parsedId = parseInt(id);
    return parsedId;
  }
}

export default CustomerController;
