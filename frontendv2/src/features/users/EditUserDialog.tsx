import React from "react";
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

export default function EditUserDialog() {
  return (
    <>
      <Dialog open={false}>
        <DialogTitle align="right">
          <IconButton>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <UserDetails />
        </DialogContent>
        <DialogActions>
          <Button>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
