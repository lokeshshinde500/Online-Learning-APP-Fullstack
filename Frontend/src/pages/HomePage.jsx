import React from "react";
import { Typography, Button, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div>
     

      {/* Hero Section */}
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `url('https://img.freepik.com/free-vector/geometric-science-education-background-vector-gradient-blue-digital-remix_53876-125993.jpg?w=996&t=st=1729291160~exp=1729291760~hmac=6b37cde89015c86635614daff8c58bd89b29fdefe1b4df79115fab7d9aa90570')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ color: "white" }}
          >
            Unlock Your Potential
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ color: "white", mb: 4 }}>
            Learn new skills and advance your career with our comprehensive
            courses.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/courses"
          >
            Explore Courses
          </Button>
        </Container>
      </Box>
    </div>
  );
};

export default HomePage;
