import { Router } from "express";
import courseRoutes from "./courseRoutes.js";
import lessonRoutes from "./lessonRoutes.js";
const routes = Router();

// course routes
routes.use("/course", courseRoutes);

// lesson routes
routes.use("/lesson", lessonRoutes);

export default routes;
