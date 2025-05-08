import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

class AdministratorController {
  constructor() {}

  async saveAdministrator(administratorData) {
    try {
      const newAdministrator = await prisma.administrator.create({
        data: {
          firstName: administratorData.firstName,
          lastName: administratorData.lastName,
          email: administratorData.email,
          password: administratorData.password,
          role: administratorData.role,
          department: administratorData.department,
        },
      });
      return newAdministrator;
    } catch (error) {
      console.error("Error saving administrator:", error);
      throw error;
    }
  }

  async getAdministratorById(id) {
    try {
      const numId = parseInt(id);
      return await prisma.administrator.findUnique({
        where: { id: numId },
      });
    } catch (error) {
      console.error("Error getting administrator by ID:", error);
      throw error;
    }
  }

  async deleteAdministrator(id) {
    try {
      const numId = this.#parseParam(id);
      await prisma.administrator.delete({
        where: { id: numId },
      });
    } catch (error) {
      console.error("Error deleting administrator:", error);
      throw error;
    }
  }

  async updateAdministrator(id, updatedAdministratorData) {
    try {
      const numId = this.#parseParam(id);
      return await prisma.administrator.update({
        where: { id: numId },
        data: {
          firstName: updatedAdministratorData.firstName,
          lastName: updatedAdministratorData.lastName,
          email: updatedAdministratorData.email,
          password: updatedAdministratorData.password,
          role: updatedAdministratorData.role,
          department: updatedAdministratorData.department,
        },
      });
    } catch (error) {
      console.error("Error updating administrator:", error);
      throw error;
    }
  }

  async getAdministrators() {
    try {
      return await prisma.administrator.findMany();
    } catch (error) {
      console.error("Error getting all administrators:", error);
      throw error;
    }
  }

  #parseParam(param) {
    return parseInt(param);
  }
}

export default AdministratorController;
