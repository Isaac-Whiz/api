import express from "express";
import CustomerController from "../customer/customer-controller.js";

const customerRouter = express.Router();
const customerController = new CustomerController();

customerRouter.get("/", (req, res) => {
  try {
    const customers = customerController.getCustomers();
    res.json(customers);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

customerRouter.get("/:id", (req, res) => {
  try {
    const customer = customerController.getCustomerById(req.params.id);
    res.json(customer);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

customerRouter.post("/", (req, res) => {
  try {
    const customer = customerController.createCustomer(req.body);
    res.json(customer);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

customerRouter.put("/:id", (req, res) => {
  try {
    const customer = customerController.updateCustomer(req.params.id, req.body);
    res.json(customer);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

customerRouter.delete("/:id", (req, res) => {
  try {
    customerController.deleteCustomer(req.params.id);
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

export default customerRouter;
