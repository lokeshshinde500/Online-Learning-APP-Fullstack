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
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/authService";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    role: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(user);
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setUser({
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
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
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
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Box>
        </form>
        <Grid2 container justifyContent="center" mt={2}>
          <Typography variant="body2" color="textSecondary">
            New user ? <Link to="/signup">Register</Link>
          </Typography>
        </Grid2>
      </Paper>
    </Container>
  );
}
