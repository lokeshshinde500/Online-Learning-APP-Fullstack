import React, { useState, useRef } from "react";
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
import { toast } from "react-toastify";
import { createCourse } from "../services/CourseServices";

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // Create a ref for the file input

  // Handle change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setCourseData({ ...courseData, image: files[0] });
    } else {
      setCourseData({ ...courseData, [name]: value });
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("price", courseData.price);
    formData.append("image", courseData.image);

    try {
      const response = await createCourse(formData);
      toast.success(response.data.message);

      // Reset the form and file input
      setCourseData({ title: "", description: "", price: "", image: null });
      fileInputRef.current.value = null; // Clear the file input
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Container component="main" maxWidth="xs" sx={{ mt: 5 }}>
        <Paper elevation={6} sx={{ padding: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Create a New Course
          </Typography>
          <form onSubmit={handleSubmit}>
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
                {loading ? <CircularProgress size={24} /> : "Create Course"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </section>
  );
};

export default AddCourse;
