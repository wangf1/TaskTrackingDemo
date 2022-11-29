import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import UserForm from "./UserForm";
import UserCommon from "./UserUtils";
import EventBus from "../utils/EventBus";

export default function EditUserDialog({ openState, userState }) {
  const open = openState[0];
  const setOpen = openState[1];

  const user = userState[0];
  const setUser = userState[1];

  const handleClose = () => {
    setUser({
      name: "",
      phone: "",
      email: "",
      roles: "",
    });
    setOpen(false);
  };

  const onSave = () => {
    UserCommon.saveUser(user)
      .then(function (response) {
        EventBus.emit("showSnackBar", { severity: "success" });
        EventBus.emit("fetchData");
        setUser({
          name: "",
          phone: "",
          email: "",
          roles: "",
        });

        setOpen(false);
      })
      .catch(function (error) {
        EventBus.emit("showSnackBar", { severity: "error" });
        console.log(error);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle align="right">
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <UserForm user={user} mode="Edit" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
