import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

import { Close } from "@mui/icons-material";
import UserDetails from "./UserDetails";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  createUser,
  selectCurrentUser,
  selectOpenEditUserDialog,
  setEditUserDialogOpen,
} from "./usersSlice";

export default function EditUserDialog() {
  const open = useAppSelector(selectOpenEditUserDialog);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setEditUserDialogOpen(false));
  };

  const handleSave = () => {
    dispatch(createUser(currentUser));
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle align="right">
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <UserDetails />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
