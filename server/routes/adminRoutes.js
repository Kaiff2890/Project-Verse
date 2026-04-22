/** @format */

import express from "express";
import { getAdminStats, updateUserByAdmin, deleteUserByAdmin } from "../controllers/adminController.js";

const router = express.Router();

// GET  /admin/stats        — full platform analytics
router.get("/stats", getAdminStats);

// PUT  /admin/users/:id    — update a user's info
router.put("/users/:id", updateUserByAdmin);

// DELETE /admin/users/:id  — delete a user + their posts
router.delete("/users/:id", deleteUserByAdmin);

export default router;
