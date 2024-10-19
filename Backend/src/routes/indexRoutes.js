import { Router } from "express";
import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";
import userRoutes from "./userRoutes.js";
import { authenticate, isAdmin } from "../middleware/authenticate.js";
const routes = Router();

// auth routes
routes.use("/auth", authRoutes);

// admin routes
routes.use("/admin", authenticate, isAdmin, adminRoutes);

// user routes
routes.use("/user", authenticate, userRoutes);

export default routes;
