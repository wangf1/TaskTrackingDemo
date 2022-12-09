import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCurrentUser, currentUserUpdated } from "./usersSlice";
import EventBus from "../../common/utils/EventBus";

import { Grid, Typography, TextField } from "@mui/material";
import { UsersEventTypes } from "./UsersEvents";

export default function UserDetails() {
  const user = useAppSelector(selectCurrentUser);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [roles, setRoles] = useState(user.roles);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();

  const clearValues = () => {
    setName("");
    setPhone("");
    setEmail("");
    setRoles([]);
    setPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    //Make sure only register one handler
    EventBus.off(UsersEventTypes.resetUserDetails);

    EventBus.on(UsersEventTypes.resetUserDetails, clearValues);
  }, []);

  useEffect(() => {
    dispatch(currentUserUpdated({ name, phone, email, roles }));
  }, [name, phone, email, roles, password, confirmPassword, dispatch]);

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
            id="roles"
            name="roles"
            label="Roles"
            fullWidth
            variant="standard"
            value={roles}
            onChange={(e) => {
              setRoles(e.target.value.split(","));
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
      </Grid>
    </>
  );
}
