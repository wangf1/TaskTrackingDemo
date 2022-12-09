import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Button, Grid } from "@mui/material";
import UserDetails from "./UserDetails";
import { selectCurrentUser, createUser } from "./usersSlice";
import EventBus from "../../common/utils/EventBus";
import { UsersEventTypes } from "./UsersEvents";

export default function AddUserForm() {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleSaveUser = () => {
    dispatch(createUser(currentUser));
  };

  const handleReset = () => {
    EventBus.emit(UsersEventTypes.resetUserDetails);
  };

  return (
    <>
      <Grid container justifyContent="flex-end" spacing={2}>
        <Grid item xs={12}>
          <UserDetails />
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" onClick={handleSaveUser}>
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
