import courseModel from "../models/courseModel.js";
import { uploadImage } from "../utils/uploadImage.js";

// create new course
export const createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    // All fields are required!
    if (!title || !description || !price) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload course image!",
        success: false,
      });
    }

    const image = await uploadImage(req.file.path);

    // Create a new course
    const newCourse = {
      title,
      description,
      price,
      image: image.secure_url,
      instructor: req.user.id,
    };

    // store course to the database
    const course = await courseModel.create(newCourse);

    return res.status(201).json({
      message: "Course created successfully.",
      course,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error!",
      success: false,
      error: error.message,
    });
  }
};

// get admin created courses
export const adminCourses = async (req, res) => {
  try {
    const courses = await courseModel.find({ instructor: req.user.id });

    // no courses found
    if (!courses) {
      return res.status(404).json({
        message: "Courses not found",
        success: false,
      });
    }

    return res.status(200).json({
      courses,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error!",
      success: false,
      error: error.message,
    });
  }
};

// get single course by id
export const getCourse = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.courseId);

    // course not found
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    return res.status(200).json({
      course,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error!",
      success: false,
      error: error.message,
    });
  }
};

// update course by id
export const updateCourse = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.courseId);

    // course not found
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    // update data
    const { title, description, price } = req.body;

    let image = { secure_url: course.image };
    // if new image come
    if (req.file) {
      image = await uploadImage(req.file.path);
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.price = price || course.price;
    course.image = image.secure_url || course.image;

    await course.save({ new: true });

    return res.status(200).json({
      message: "Course updated successfully.",
      course,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error!",
      success: false,
      error: error.message,
    });
  }
};

// delete course
export const deleteCourse = async (req, res) => {
  try {
    const course = await courseModel.findByIdAndDelete(req.params.courseId);

    // course not found
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Course deleted successfully.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error!",
      success: false,
      error: error.message,
    });
  }
};
