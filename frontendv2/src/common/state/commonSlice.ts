import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CommonState {
  snackbarOpen: boolean;
  snackbarSeverity: AlertColor;
  snackbarMessage: string;
}

const initialState: CommonState = {
  snackbarOpen: false,
  snackbarSeverity: "success",
  snackbarMessage: "",
};

const usersSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setSnackbarOpen(state, action) {
      state.snackbarOpen = action.payload;
    },
    setSnackbarSeverity(state, action) {
      state.snackbarSeverity = action.payload;
    },
    setSnackbarMessage(state, action) {
      state.snackbarMessage = action.payload;
    },
  },
});

export const selectSnackbarOpen = (state: RootState): boolean =>
  state.common.snackbarOpen;
export const selectSnackbarSeverity = (state: RootState): AlertColor =>
  state.common.snackbarSeverity;
export const selectSnackbarMessage = (state: RootState): string =>
  state.common.snackbarMessage;

export const { setSnackbarOpen, setSnackbarSeverity, setSnackbarMessage } =
  usersSlice.actions;

export default usersSlice.reducer;
