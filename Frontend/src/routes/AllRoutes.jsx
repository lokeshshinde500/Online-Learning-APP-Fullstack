import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import HomePage from "../pages/HomePage";
import AddCourse from "../pages/AddCourse";
import MyCourses from "../pages/MyCourses";

export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/addCourse" element={<AddCourse />} />
        <Route path="/myCourses" element={<MyCourses />} />
      </Routes>
    </>
  );
}
