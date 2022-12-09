import { Grid } from "@mui/material";
import React from "react";
import AddUserForm from "./AddUserForm";
import EditUserDialog from "./EditUserDialog";
import UsersTable from "./UsersTable";

export default function UsersPage() {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <AddUserForm />
        </Grid>
        <Grid item xs={8}>
          <UsersTable />
        </Grid>
        <Grid item xs={12}>
          <EditUserDialog />
        </Grid>
      </Grid>
    </>
  );
}
