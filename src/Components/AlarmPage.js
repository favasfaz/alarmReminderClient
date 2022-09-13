import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addingAlarm } from "../Redux/UserDeteilsRedux";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen }) {
  const users = useSelector((state) => state.users);

  const [text, setText] = React.useState("");
  const [error, setError] = useState("");
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  const [fTime, setFtime] = useState(0);
  const [sTime, setStime] = useState(0);
  const [tTime, setTtime] = useState(0);
  const [dTime, setDtime] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [desc, setDesc] = useState("");

  useEffect(() => {
    function getTime(hours, minutes, power, base) {
      let limit = base * power;
      if (minutes + limit >= 60) {
        minutes = minutes + limit - 60;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        hours += 1;
      } else {
        minutes = minutes + limit;
      }
      return `${hours}:${minutes}`;
    }
    setFtime(getTime(hours, minutes, 1, 15));
    setStime(getTime(hours, minutes, 2, 15));
    setTtime(getTime(hours, minutes, 3, 15));
  }, []);


  const handleText = (e) => {
    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (e.target.value === "") {
      setError("fill All field");
    } else if (format.test(e.target.value)) {
      setError("Special charachters not accepted");
    } else {
      setError("");
    }
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setError("");

    setText(e.target.value);
    setDtime(e.target.value);
  };

  const handleSubmit = async () => {
    const res = users.alarms.find((item, i) => {
      if (item.timer == text) return true;
    });
    if (res) {
      setError("already in");
    } else {
      setError("");
      const data = { timer: text, desc: desc };
      await dispatch(addingAlarm(data));
      navigate(`/timout/${dTime}`);
    }
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Alarm Reminder?"}</DialogTitle>
        <DialogContent sx={{ width: "50vh" }}>
          {error && (
            <Typography color="error.main" variant="body1">
              {error}
            </Typography>
          )}
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              id="standard-multiline-static"
              label="Write Here"
              multiline
              rows={4}
              fullWidth
              variant="standard"
              helperText={error}
              onChange={(e) => handleDesc(e)}
              onKeyUp={(e) => handleText(e)}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Alarm</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={text}
                label="alarm"
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={15}>{fTime}</MenuItem>
                <MenuItem value={30}>{sTime}</MenuItem>
                <MenuItem value={45}>{tTime}</MenuItem>
              </Select>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={Boolean(error.length !== 0 || text.length == 0)}
            onClick={handleSubmit}
          >
            save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
