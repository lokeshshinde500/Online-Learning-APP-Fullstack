import api from "../API/Api";

const token = localStorage.getItem("token");

const headers = {
  Authorization: `Bearer ${token}`,
};

// create new course
export const createCourse = async (courseData) =>
  await api.post("/admin/course", courseData, {
    headers,
  });

// get admin created courses
export const getAdminCourses = async () =>
  await api.get("/admin/course", {
    headers,
  });

// get single course by id
export const getAdminCourse = async (id) =>
  await api.get(`/admin/course/${id}`, {
    headers,
  });

// update admin course by id
export const updateAdminCourse = async (id, courseData) =>
  await api.patch(`/admin/course/${id}`, courseData, {
    headers,
  });

// delete admin course by id
export const deleteAdminCourse = async (id) =>
  await api.delete(`/admin/course/${id}`, {
    headers,
  });
