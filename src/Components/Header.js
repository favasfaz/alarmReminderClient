import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const user = localStorage.getItem("userToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };
  const handlePush = () => {
    navigate("/home");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "darkblue" }}>
        <Toolbar>
          <Typography
            onClick={handlePush}
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              "&:hover:not(.Mui-disabled)": {
                cursor: "pointer",
              },
            }}
          >
            Task
          </Typography>
          {user && (
            <Button variant="h6" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
