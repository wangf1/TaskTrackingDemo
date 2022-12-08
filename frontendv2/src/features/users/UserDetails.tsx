import React from "react";
import { Grid, Typography, TextField } from "@mui/material";

export default function UserDetails() {
  return (
    <>
      <Typography variant="h6" gutterBottom></Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="phone"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="roles"
            name="roles"
            label="Roles"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            name="password"
            label="Password"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </>
  );
}
