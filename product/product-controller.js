import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

class ProductController {
  constructor() {}

  async getProducts() {
    try {
      return await prisma.product.findMany();
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      return await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      console.error("Error getting product by ID:", error);
      throw error;
    }
  }

  async saveProduct(productData) {
    try {
      return await prisma.product.create({
        data: {
          name: productData.name,
          price: parseFloat(productData.price),
          description: productData.description,
          vendorId: productData.vendorId
            ? parseInt(productData.vendorId)
            : null,
        },
      });
    } catch (error) {
      console.error("Error saving product:", error);
      throw error;
    }
  }

  async updateProduct(id, updatedProductData) {
    try {
      return await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
          name: updatedProductData.name,
          price: parseFloat(updatedProductData.price),
          description: updatedProductData.description,
          vendorId: updatedProductData.vendorId
            ? parseInt(updatedProductData.vendorId)
            : null,
        },
      });
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      await prisma.product.delete({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}

export default ProductController;
