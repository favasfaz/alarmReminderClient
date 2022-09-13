import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { userDeteils } from "../Redux/UserDeteilsRedux";
import AlarmPage from "./AlarmPage";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.userDeteils);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(userDeteils());
  }, []);

  return (
    <Grid container p={{ xs: "none", sm: 4, lg: 10 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "19px" }}>Email</TableCell>
              <TableCell sx={{ fontSize: "19px" }} align="right">
                Name
              </TableCell>
              <TableCell sx={{ fontSize: "19px" }} align="right">
                phone
              </TableCell>
              <TableCell sx={{ fontSize: "19px" }} align="right">
                option
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => setOpen(true)}>
                    Add Alarm
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AlarmPage open={open} setOpen={setOpen} />
    </Grid>
  );
}
