import lessonModel from "../models/lessonModel.js";
import courseModel from "../models/courseModel.js";

export const createLesson = async (req, res) => {
  try {
    const { title, description, lessonNumber, course } = req.body;

    // all required fields required
    if (!title || !description || !lessonNumber || !course) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    // Check if the course exists
    const foundCourse = await courseModel.findById(course);

    if (!foundCourse) {
      return res
        .status(404)
        .json({ message: "Course not found!", success: false });
    }

    // Create a new lesson
    const newLesson = {
      title,
      description,
      lessonNumber,
      course,
    };

    // Save the lesson to the database
    const lesson = await lessonModel.create(newLesson);

    // Update the course by adding the new lesson's id
    foundCourse.lessons.push(lesson._id);
    await foundCourse.save({ new: true });

    return res
      .status(201)
      .json({ message: "Lesson created successfully.", lesson, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server error!",
      success: false,
      error: error.message,
    });
  }
};
