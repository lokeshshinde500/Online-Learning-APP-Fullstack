import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid2,
  Box,
} from "@mui/material";

const CourseCard = ({ course, onDelete, onUpdate }) => {
  return (
    <Card sx={{ maxWidth: 300, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={course.image}
        alt={course.title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
        <Typography variant="h6" color="primary">
          ${course.price}
        </Typography>
      </CardContent>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onUpdate(course)}
        >
          Update
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => onDelete(course._id)}
        >
          Delete
        </Button>
      </Box>
    </Card>
  );
};

const CourseList = ({ courses, onDelete, onUpdate }) => {
  return (
    <Grid2 container spacing={2}>
      {courses.map((course) => (
        <Grid2 item xs={12} sm={6} md={3} key={course._id}>
          <CourseCard course={course} onDelete={onDelete} onUpdate={onUpdate} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default CourseList;
