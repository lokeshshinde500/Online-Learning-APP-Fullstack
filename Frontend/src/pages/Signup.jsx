import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid2,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signupUser } from "../services/authService";

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signupUser(user);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setUser({
        name: "",
        email: "",
        role: "",
        password: "",
      });
      setLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        style={{ padding: "30px", borderRadius: "12px", width: "100%" }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Create an Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              name="name"
              label="Full Name"
              variant="outlined"
              fullWidth
              required
              value={user.name}
              onChange={handleChange}
            />
          </Box>
          <Box mb={2}>
            <TextField
              name="email"
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={user.email}
              onChange={handleChange}
            />
          </Box>
          <Box mb={2}>
            <FormControl variant="outlined" fullWidth required>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                name="role"
                value={user.role}
                onChange={handleChange}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={user.password}
              onChange={handleChange}
            />
          </Box>
          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {loading ? <CircularProgress size={24} /> : " Sign Up"}
            </Button>
          </Box>
        </form>
        <Grid2 container justifyContent="center" mt={2}>
          <Typography variant="body2" color="textSecondary">
            Already have an account? <Link to="/">Login</Link>
          </Typography>
        </Grid2>
      </Paper>
    </Container>
  );
}
