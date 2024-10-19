# Online Learning App

## Description
An API for an online learning platform that supports user authentication, course management, and lesson handling. This application allows users to register, log in, manage their courses, and access lessons.

## Features
- User registration and authentication
- Course creation and management for admins
- Lesson management for each course
- Secure file uploads using Cloudinary
- Role-based access control

## Technologies Used
- **Node.js** with **Express** for server-side development
- **MongoDB** with **Mongoose** for database management
- **Cloudinary** for media storage
- **JWT (JSON Web Tokens)** for authentication
- **Bcrypt** for password hashing
- **Multer** for handling file uploads

## FRONTEND deployment 
https://vocal-mochi-3a2f5b.netlify.app/

## BACKEND deployment 
https://online-learning-app-backend.onrender.com/

# API Endpoints

## Authentication Routes

### POST /auth/register
- Register a new user.

### POST /auth/login
- Log in a user.

### GET /auth/profile
- View the user profile (authenticated and admin required).

### PATCH /auth/changePassword
- Change the user password (authenticated required).

---

## Admin Routes

### POST /admin/course
- Create a new course (authenticated and admin required).

### GET /admin/course
- Get all courses created by the admin.

### GET /admin/course/:courseId
- Get details of a specific course.

### PATCH /admin/course/:courseId
- Update a specific course.

### DELETE /admin/course/:courseId
- Delete a specific course.

---

## User Routes

### GET /user/all
- Get all available courses.

### POST /user/enroll
- Enroll in a course.

### GET /user/courses
- Get courses that the user is enrolled in.

### GET /user/courses/:courseId
- Get details of a specific enrolled course.

---

## Course Routes

### POST /course
- Create a new course (admin route).

### GET /course
- Get all admin-created courses.

### GET /course/:courseId
- Get a specific course by ID.

### PATCH /course/:courseId
- Update a specific course.

### DELETE /course/:courseId
- Delete a specific course.

---

## Lesson Routes

### POST /lesson
- Create a new lesson.
