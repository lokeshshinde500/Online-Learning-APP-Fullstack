import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  deleteAdminCourse,
  getAdminCourses,
  updateAdminCourse,
} from "../services/CourseServices";
import CourseList from "../components/CourseList";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid2,
  CircularProgress,
} from "@mui/material";

function MyCourses() {
  const [courses, setMycourses] = useState([]);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });
  const [edit, setEdit] = useState(false);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Handle change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setCourseData({ ...courseData, image: files[0] });
    } else {
      setCourseData({ ...courseData, [name]: value });
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await getAdminCourses();
      setMycourses(response.data.courses);
      toast.success(response.data.courses);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [courses]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteAdminCourse(id);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = (course) => {
    setEdit(true);
    setCourseData(course);
  };

  const updateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", courseData.title);
      formData.append("description", courseData.description);
      formData.append("price", courseData.price);
      if (courseData.image) {
        formData.append("image", courseData.image);
      }

      const response = await updateAdminCourse(courseData._id, formData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setCourseData({
        title: "",
        description: "",
        price: "",
        image: null,
      });
      setEdit(false);
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        {!edit ? (
          <CourseList
            courses={courses}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ) : (
          <section>
            <Container component="main" maxWidth="xs" sx={{ mt: 5 }}>
              <Paper elevation={6} sx={{ padding: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                  Update Course
                </Typography>
                <form onSubmit={updateCourse}>
                  <Grid2 container spacing={2}>
                    <Grid2 item xs={12}>
                      <TextField
                        name="title"
                        label="Course Title"
                        variant="outlined"
                        fullWidth
                        required
                        value={courseData.title}
                        onChange={handleChange}
                      />
                    </Grid2>
                    <Grid2 item xs={12}>
                      <TextField
                        name="description"
                        label="Course Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        required
                        value={courseData.description}
                        onChange={handleChange}
                      />
                    </Grid2>
                    <Grid2 item xs={12}>
                      <TextField
                        name="price"
                        label="Course Price"
                        variant="outlined"
                        fullWidth
                        required
                        type="number"
                        value={courseData.price}
                        onChange={handleChange}
                      />
                    </Grid2>
                    <Grid2 item xs={12}>
                      <input
                        accept="image/*"
                        type="file"
                        onChange={handleChange}
                        style={{ display: "none" }}
                        id="image-upload"
                        ref={fileInputRef} // Attach the ref here
                      />
                      <label htmlFor="image-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          fullWidth
                          sx={{ marginTop: 2 }}
                          disabled={loading}
                        >
                          Upload Course Image
                        </Button>
                      </label>
                    </Grid2>
                  </Grid2>
                  <Box mt={3}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Update course"
                      )}
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="info"
                      fullWidth
                      disabled={loading}
                      mt={3}
                      onClick={() => setEdit(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              </Paper>
            </Container>
          </section>
        )}
      </Container>
    </>
  );
}

export default MyCourses;
