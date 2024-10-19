import api from "../API/Api";

// signup user
export const signupUser = async (userData) =>
  await api.post("/auth/register", userData);

// login user
export const loginUser = async (userData) =>
  await api.post("/auth/login", userData);
