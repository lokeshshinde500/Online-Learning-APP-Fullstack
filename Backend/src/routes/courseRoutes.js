import { Router } from "express";
import {
  adminCourses,
  createCourse,
  deleteCourse,
  getCourse,
  updateCourse,
} from "../controllers/courseController.js";
import { upload } from "../models/courseModel.js";
const routes = Router();

// create course
routes.post("/", upload, createCourse);

// get admin created courses
routes.get("/", adminCourses);

// get course
routes.get("/:courseId", getCourse);

// update course
routes.patch("/:courseId", upload, updateCourse);

// delete course
routes.delete("/:courseId", deleteCourse);

export default routes;
