import { Router } from "express";
import { createLesson } from "../controllers/lessonController.js";
const routes = Router();

// create lesson
routes.post("/", createLesson);

export default routes;
