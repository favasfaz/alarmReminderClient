import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SetTimout() {
  const TimerData = useSelector((state) => state.users);
  const navigate = useNavigate();

  let time = useParams().id;
  time = `${time * 60}`;


  const handlePush = () => {
    navigate("/tableView");
  };

  const children = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds}`;
  };

  children(time)

  return (
    <>
      <Grid container mt={4} justifyContent="center">
        <Paper
          elevation={3}
          style={{
            padding: 40,
            height: "60vh",
            width: 380,
            margin: "20px auto",
          }}
        >
          <Grid
            align="center"
            alignItems="center"
            justifyContent="center"
            sx={{ marginBottom: 5 }}
          >
            {TimerData && TimerData.alarms.length > 0 && (
              <p>{TimerData.alarms[TimerData.alarms.length - 1].desc}</p>
            )}
          </Grid>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <CountdownCircleTimer
              isPlaying
              duration={time}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[7, 5, 2, 0]}
            >
              {({ remainingTime }) => `${remainingTime} sec`}
            </CountdownCircleTimer>
            <Button
              sx={{ marginTop: 10 }}
              justifyContent="center"
              variant="contained"
              size="medium"
              onClick={handlePush}
            >
              Back
            </Button>
          </div>
        </Paper>
      </Grid>
    </>
  );
}

export default SetTimout;
