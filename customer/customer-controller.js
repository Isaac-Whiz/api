import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

class CustomerController {
  constructor() {}

  async getCustomers() {
    try {
      return await prisma.customer.findMany();
    } catch (error) {
      console.error("Error getting customers:", error);
      throw error;
    }
  }

  async getCustomerById(id) {
    try {
      return await prisma.customer.findUnique({
        where: { id: this.#parseId(id) },
      });
    } catch (error) {
      console.error("Error getting customer by ID:", error);
      throw error;
    }
  }

  async saveCustomer(customerData) {
    try {
      const newCustomer = await prisma.customer.create({
        data: {
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          email: customerData.email,
          password: customerData.password,
          role: customerData.role,
          contactNumber: customerData.contactNumber,
          address: customerData.address,
          city: customerData.city,
          state: customerData.state,
          country: customerData.country,
        },
      });
      return newCustomer;
    } catch (error) {
      console.error("Error saving customer:", error);
      throw error;
    }
  }

  async updateCustomer(id, updatedCustomerData) {
    try {
      return await prisma.customer.update({
        where: { id: this.#parseId(id) },
        data: {
          firstName: updatedCustomerData.firstName,
          lastName: updatedCustomerData.lastName,
          email: updatedCustomerData.email,
          password: updatedCustomerData.password,
          role: updatedCustomerData.role,
          contactNumber: updatedCustomerData.contactNumber,
          address: updatedCustomerData.address,
          city: updatedCustomerData.city,
          state: updatedCustomerData.state,
          country: updatedCustomerData.country,
        },
      });
    } catch (error) {
      console.error("Error updating customer:", error);
      throw error;
    }
  }

  async deleteCustomer(id) {
    try {
      await prisma.customer.delete({
        where: { id: this.#parseId(id) },
      });
    } catch (error) {
      console.error("Error deleting customer:", error);
      throw error;
    }
  }

  #parseId(id) {
    const parsedId = parseInt(id);
    return parsedId;
  }
}

export default CustomerController;
