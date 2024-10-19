import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Online Learning APP
          </Typography>
          <Link to="/addCourse" className="bg-green-500 rounded-md text-xs p-1 m-1">
            Add course
          </Link>
          <Link to="/myCourses" className="bg-green-500 rounded-md text-xs p-1 m-1">
            My courses
          </Link>
          <Link to="/">Logout</Link>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
