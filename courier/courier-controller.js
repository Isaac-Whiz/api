import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

class CourierController {
  constructor() {}

  async getCouriers() {
    try {
      return await prisma.courier.findMany();
    } catch (error) {
      console.error("Error getting couriers:", error);
      throw error;
    }
  }

  async getCourierById(id) {
    try {
      return await prisma.courier.findUnique({
        where: { id: this.#parseId(id) },
      });
    } catch (error) {
      console.error("Error getting courier by ID:", error);
      throw error;
    }
  }

  async saveCourier(courierData) {
    try {
      const newCourier = await prisma.courier.create({
        data: {
          firstName: courierData.firstName,
          lastName: courierData.lastName,
          email: courierData.email,
          password: courierData.password,
          role: courierData.role,
          status: courierData.status,
        },
      });
      return newCourier;
    } catch (error) {
      console.error("Error saving courier:", error);
      throw error;
    }
  }

  async updateCourier(id, updatedCourierData) {
    try {
      return await prisma.courier.update({
        where: { id: this.#parseId(id) },
        data: {
          firstName: updatedCourierData.firstName,
          lastName: updatedCourierData.lastName,
          email: updatedCourierData.email,
          password: updatedCourierData.password,
          role: updatedCourierData.role,
          status: updatedCourierData.status,
        },
      });
    } catch (error) {
      console.error("Error updating courier:", error);
      throw error;
    }
  }

  async deleteCourier(id) {
    try {
      await prisma.courier.delete({
        where: { id: this.#parseId(id) },
      });
    } catch (error) {
      console.error("Error deleting courier:", error);
      throw error;
    }
  }

  #parseId(id) {
    return parseInt(id);
  }
}

export default CourierController;
