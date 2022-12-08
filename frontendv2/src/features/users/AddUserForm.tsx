import React from "react";
import { Button, Grid } from "@mui/material";
import UserDetails from "./UserDetails";

export default function AddUserForm() {
  return (
    <>
      <Grid item xs={2} container justifyContent="flex-end">
        <Grid item xs={12}>
          <UserDetails />
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined">Reset</Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained">Save</Button>
        </Grid>
      </Grid>
    </>
  );
}
