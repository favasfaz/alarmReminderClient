import { Grid, Button } from "@mui/material";
import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Oval } from 'react-loader-spinner'

function Home() {
  const navigate = useNavigate();
  const [loading,setLoading]= useState(true)
  useEffect(() => {
    setTimeout(()=>{
      setLoading(false)
      const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/");
    }
    },1000)
  });
  const handlePush = () => {
    navigate("/deteilsPage");
  };
  return (
    <Grid container justifyContent="center">
      {loading ? <Grid>
  <Oval
  ariaLabel="loading-indicator"
  height={80}
  width={80}
  strokeWidth={5}
  strokeWidthSecondary={1}
  color="blue"
  secondaryColor="white"
/>
  </Grid> :
  <Button
  onClick={handlePush}
  sx={{ marginTop: "20px", marginBottom: "10px" }}
  //   onClick={() => setOpen(true)}
  variant="contained"
  color="primary"
>
  Add Deteils
</Button>
}
    </Grid>
  );
}

export default Home;
