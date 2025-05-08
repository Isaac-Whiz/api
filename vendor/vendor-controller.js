import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

class VendorController {
  constructor() {}

  async getVendors() {
    try {
      return await prisma.vendor.findMany();
    } catch (error) {
      console.error("Error getting vendors:", error);
      throw error;
    }
  }

  async getVendorById(id) {
    try {
      const vendor = await prisma.vendor.findUnique({
        where: { id: parseInt(id) },
      });

      if (!vendor) {
        throw new Error("Vendor not found");
      }

      return vendor;
    } catch (error) {
      console.error("Error getting vendor by ID:", error);
      throw error;
    }
  }

  async saveVendor(vendorData) {
    try {
      const newVendor = await prisma.vendor.create({
        data: {
          firstName: vendorData.firstName,
          lastName: vendorData.lastName,
          email: vendorData.email,
          password: vendorData.password,
          role: vendorData.role,
          contactNumber: vendorData.contactNumber,
          address: vendorData.address,
          status: vendorData.status,
        },
      });

      return newVendor;
    } catch (error) {
      console.error("Error saving vendor:", error);
      throw error;
    }
  }

  async updateVendor(id, updatedVendorData) {
    try {
      const index = parseInt(id);

      const existingVendor = await prisma.vendor.findUnique({
        where: { id: index },
      });

      if (!existingVendor) {
        throw new Error("Vendor not found");
      }

      const updatedVendor = await prisma.vendor.update({
        where: { id: index },
        data: {
          firstName: updatedVendorData.firstName || existingVendor.firstName,
          lastName: updatedVendorData.lastName || existingVendor.lastName,
          email: updatedVendorData.email || existingVendor.email,
          password: updatedVendorData.password || existingVendor.password,
          role: updatedVendorData.role || existingVendor.role,
          contactNumber:
            updatedVendorData.contactNumber || existingVendor.contactNumber,
          address: updatedVendorData.address || existingVendor.address,
          status: updatedVendorData.status || existingVendor.status,
        },
      });

      return updatedVendor;
    } catch (error) {
      console.error("Error updating vendor:", error);
      throw error;
    }
  }

  async deleteVendor(id) {
    try {
      const index = parseInt(id);

      const existingVendor = await prisma.vendor.findUnique({
        where: { id: index },
      });

      if (!existingVendor) {
        throw new Error("Vendor not found");
      }

      await prisma.vendor.delete({
        where: { id: index },
      });
    } catch (error) {
      console.error("Error deleting vendor:", error);
      throw error;
    }
  }
}

export default VendorController;
