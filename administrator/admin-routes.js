import express from "express";
import AdminstratorController from "./administrator-controller.js";

const adminRouter = express.Router();
const admin = new AdminstratorController();

adminRouter.get("/:id", (req, res) => {
  try {
    const administrator = admin.getAdministratorById(req.params.id);
    if (!administrator) {
      return res.status(404).json({ error: "Administrator not found" });
    }
    res.json(administrator);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

adminRouter.post("/", (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is required" });
    }
    const newAdmin = admin.saveAdministrator(req.body);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

adminRouter.get("/", (req, res) => {
  try {
    const administrators = admin.getAdministrators();
    res.json(administrators);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

adminRouter.put("/:id", (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is required" });
    }
    const updatedAdmin = admin.updateAdministrator(req.params.id, req.body);
    if (!updatedAdmin) {
      return res.status(404).json({ error: "Administrator not found" });
    }
    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

adminRouter.delete("/:id", (req, res) => {
  try {
    const result = admin.deleteAdministrator(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Administrator not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default adminRouter;
