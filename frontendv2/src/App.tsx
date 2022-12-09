import { Alert, Snackbar } from "@mui/material";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Root from "./app/route/Root";
import {
  selectSnackbarMessage,
  selectSnackbarOpen,
  selectSnackbarSeverity,
  setSnackbarOpen,
} from "./common/state/commonSlice";

export default function App() {
  const open = useAppSelector(selectSnackbarOpen);
  const msgSeverity = useAppSelector(selectSnackbarSeverity);
  const snackbarMessage = useAppSelector(selectSnackbarMessage);
  const dispatch = useAppDispatch();

  return (
    <>
      <Root />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={(e) => {
          dispatch(setSnackbarOpen(false));
        }}
      >
        <Alert severity={msgSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </>
  );
}
