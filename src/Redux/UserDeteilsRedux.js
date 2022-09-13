import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  userDeteils: [],
  alarms: [],
  error: ''
};

export const userDeteils = createAsyncThunk("users/userDeteils", async () => {
  const user = await axios.get("/api/users");
  return user.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addingAlarm: (state, action) => {
    
         state.alarms.push(action.payload);
      
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userDeteils.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userDeteils.fulfilled, (state, action) => {
      state.loading = false;
      state.userDeteils = action.payload;
      state.error = "";
    });
    builder.addCase(userDeteils.rejected, (state, action) => {
      state.loading = false;
      state.userDeteils = [];
      state.error = action.payload;
    });
  },
});

export const { addingAlarm } = usersSlice.actions;
export default usersSlice.reducer;
