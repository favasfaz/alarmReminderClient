import {
  Button,
  Paper,
  TextField,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import {AxiosInstance} from "../config";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("userToken");
    if (auth) {
      navigate("/home");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      const logined = await AxiosInstance.post("/api/users/login", data);
      localStorage.setItem("userToken", logined.data.token);
      navigate("/home");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Grid container mt={5}>
      <Paper
        elevation={10}
        style={{ padding: 40, height: "60vh", width: 380, margin: "20px auto" }}
      >
        <Grid align="center" alignItems="center" justifyContent="center">
          <Avatar style={{ backgroundColor: "darkblue" }}>
            <LockIcon />
          </Avatar>
          <Typography mt={2} variant="h5">
            SIGN IN
          </Typography>
        </Grid>
        <Grid mt={5}>
          {error ? (
            <Typography color="error.main" variant="subtitle1" component="div">
              {error}
            </Typography>
          ) : (
            ""
          )}

          <TextField
            required
            style={{ marginTop: "10px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            type="email"
            fullWidth
          />
          <TextField
            required
            style={{ marginTop: "20px" }}
            value={password}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            fullWidth
          />
        </Grid>
        <Grid mt={3}></Grid>
        <Button
          type="submit"
          disabled={Boolean(email === "" || password === "")}
          onClick={handleSubmit}
          variant="contained"
          style={{
            color: "white",
            backgroundColor: "darkblue",
            marginTop: "5px",
          }}
          fullWidth
        >
          Submit
        </Button>

        <Typography mt={1} variant="body1">
          Forgot Password?
        </Typography>
      </Paper>
    </Grid>
  );
}

export default UserLogin;
