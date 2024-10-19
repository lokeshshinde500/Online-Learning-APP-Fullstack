import bcrypt from "bcrypt";

// encrypt password
export const encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// compare hash password
export const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};
