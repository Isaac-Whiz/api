import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

class OrderController {
  constructor() {}

  async getOrders() {
    try {
      return await prisma.order.findMany({
        include: {
          orderProducts: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error getting orders:", error);
      throw error;
    }
  }

  async getOrderById(id) {
    try {
      return await prisma.order.findUnique({
        where: { id: parseInt(id) },
        include: {
          orderProducts: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error getting order by ID:", error);
      throw error;
    }
  }

  async addOrder(orderData) {
    try {
      const { products, ...orderDetails } = orderData;

      return await prisma.order.create({
        data: {
          customerId: orderDetails.customerId,
          date: new Date(orderDetails.date),
          status: orderDetails.status,
          orderProducts: {
            create: products.map((product) => ({
              product: {
                connect: { id: product.productId },
              },
              quantity: product.quantity,
            })),
          },
        },
        include: {
          orderProducts: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error adding order:", error);
      throw error;
    }
  }

  async updateOrder(id, updatedOrderData) {
    try {
      const { products, ...orderDetails } = updatedOrderData;
      const orderId = parseInt(id);

      await prisma.orderProduct.deleteMany({
        where: { orderId },
      });

      return await prisma.order.update({
        where: { id: orderId },
        data: {
          customerId: orderDetails.customerId,
          date: new Date(orderDetails.date),
          status: orderDetails.status,
          orderProducts: {
            create: products.map((product) => ({
              product: {
                connect: { id: product.productId },
              },
              quantity: product.quantity,
            })),
          },
        },
        include: {
          orderProducts: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  }

  async deleteOrder(id) {
    try {
      const orderId = parseInt(id);

      await prisma.orderProduct.deleteMany({
        where: { orderId },
      });

      await prisma.order.delete({
        where: { id: orderId },
      });
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  }
}

export default OrderController;
