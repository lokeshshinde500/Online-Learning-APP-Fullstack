import courseModel from "../models/courseModel.js";
import enrollmentModel from "../models/enrollmentModel.js";

// get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await courseModel.find();

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

// get enroll in course
export const enrollCourse = async (req, res) => {
  try {
    const { course } = req.body;
    const foundCourse = await courseModel.findById(course);

    if (foundCourse.enrolledUser.includes(req.user.id)) {
      return res.status(400).json({
        message: "You already enrolled in this course!",
        success: false,
      });
    }

    // no courses found
    if (!foundCourse) {
      return res.status(404).json({
        message: "Courses not found",
        success: false,
      });
    }

    // enroll
    const newEnroll = {
      user: req.user.id,
      course,
    };

    await foundCourse.enrolledUser.push(req.user.id);
    foundCourse.save();
    await enrollmentModel.create(newEnroll);

    return res.status(200).json({
      message: "Enrolled into course successfully.",
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

// view enrolled courses
export const myCourses = async (req, res) => {
  try {
    const myCourses = await courseModel.find({ enrolledUser: req.user.id });

    // no courses found
    if (!myCourses) {
      return res.status(404).json({
        message: "no enrollments found!",
        success: false,
      });
    }

    return res.status(200).json({
      myCourses,
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

// get signle course by id
export const getSingleCourse = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.courseId);

    // no courses found
    if (!course) {
      return res.status(404).json({
        message: "No course found!",
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
