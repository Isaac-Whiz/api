import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

class DeliveryController {
  constructor() {}

  async getDeliveries() {
    try {
      return await prisma.delivery.findMany();
    } catch (error) {
      console.error("Error getting deliveries:", error);
      throw error;
    }
  }

  async getDeliveryById(id) {
    try {
      const numId = parseInt(id);
      return await prisma.delivery.findUnique({
        where: { id: numId },
      });
    } catch (error) {
      console.error("Error getting delivery by ID:", error);
      throw error;
    }
  }

  async addDelivery(deliveryData) {
    try {
      return await prisma.delivery.create({
        data: {
          orderId: deliveryData.orderId,
          deliveryDate: new Date(deliveryData.deliveryDate),
          status: deliveryData.status,
          courierId: deliveryData.courierId,
        },
      });
    } catch (error) {
      console.error("Error adding delivery:", error);
      throw error;
    }
  }

  async updateDelivery(id, updatedDeliveryData) {
    try {
      const numId = parseInt(id);
      return await prisma.delivery.update({
        where: { id: numId },
        data: {
          orderId: updatedDeliveryData.orderId,
          deliveryDate: new Date(updatedDeliveryData.deliveryDate),
          status: updatedDeliveryData.status,
          courierId: updatedDeliveryData.courierId,
        },
      });
    } catch (error) {
      console.error("Error updating delivery:", error);
      throw error;
    }
  }

  async deleteDelivery(id) {
    try {
      const numId = parseInt(id);
      await prisma.delivery.delete({
        where: { id: numId },
      });
    } catch (error) {
      console.error("Error deleting delivery:", error);
      throw error;
    }
  }
}

export default DeliveryController;
