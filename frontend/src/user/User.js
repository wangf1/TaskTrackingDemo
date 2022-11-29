import React, { Fragment, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import ApiUtils from "../utils/ApiUtils";

export default function UserForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const onClickReset = function (e) {
    setName("");
    setPhone("");
    setEmail("");
    setRole("");
    setPassword("");
    setConfirmPassword("");
  };

  const onClickSave = function (e) {
    axios
      .post(ApiUtils.getApiUrl("/users"), {
        name: name,
        email: email,
        phone: phone,
        password: password,
        roles: [role],
      })
      .then(function (response) {
        setSnackbarOpen(true);
        setSnackbarMessage(`Successfully create user with name '${name}'.`);
        setSeverity("success");
        console.log(response);
      })
      .catch(function (error) {
        setSnackbarOpen(true);
        setSnackbarMessage(`Fail to create user with name '${name}'.`);
        setSeverity("error");
        console.log(error);
      });
  };

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Add User
      </Typography>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={(e) => {
          setSnackbarOpen(false);
        }}
      >
        <Alert severity={severity}>{snackbarMessage}</Alert>
      </Snackbar>
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
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
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
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="role"
            name="role"
            label="role"
            fullWidth
            variant="standard"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            name="password"
            label="Password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            fullWidth
            variant="standard"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="id"
            name="id"
            // value={user.id}
            sx={{ display: { xl: "none", xs: "block" } }}
          />
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end">
          <Grid item xs={4}>
            <Button variant="outlined" onClick={onClickReset}>
              Reset
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={onClickSave}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}
