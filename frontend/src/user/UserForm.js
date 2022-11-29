import React, { Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import EventBus from "../utils/EventBus";

export default function UserForm({ user, mode = "Add" }) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [roles, setRoles] = useState(user.roles);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateUser = function (prop, value) {
    user[prop] = value;
  };

  const GetFormTitle = function () {
    if (mode === "Edit") {
      return "Edit User";
    } else {
      return "Add User";
    }
  };

  EventBus.on("resetForm", (e) => {
    setName("");
    setPhone("");
    setEmail("");
    setRoles("");
    setPassword("");
    setConfirmPassword("");
  });

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        <GetFormTitle />
      </Typography>
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
              updateUser("name", e.target.value);
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
              updateUser("phone", e.target.value);
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
              updateUser("email", e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="roles"
            name="roles"
            label="Roles"
            fullWidth
            variant="standard"
            value={roles}
            onChange={(e) => {
              setRoles(e.target.value);
              updateUser("roles", e.target.value);
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
              updateUser("password", e.target.value);
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
            // value={id}
            sx={{ display: { xl: "none", xs: "block" } }}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}
