import { Router } from "express";
import {
  enrollCourse,
  getCourses,
  getSingleCourse,
  myCourses,
} from "../controllers/userController.js";
const routes = Router();

// get all available courses
routes.get("/all", getCourses);

// buy / enroll course
routes.post("/enroll", enrollCourse);

// get enrolled courses
routes.get("/courses", myCourses);

// get single courses
routes.get("/courses/:courseId", getSingleCourse);

export default routes;
