import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity,
} from "../../common/state/commonSlice";
import { PageQueryParams } from "../../common/types/UtilTypes";
import EventBus from "../../common/utils/EventBus";
import { User } from "./User";
import { UsersEventTypes } from "./UsersEvents";

function buidDummyUser(): User {
  return { id: null, name: "", phone: "", email: "", roles: [] };
}

const initialState = {
  currentUser: buidDummyUser(),
  users: [],
  totalUsersCount: 0,
  totalPages: 0,
  openEditUserDialog: false,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (pageProps: PageQueryParams) => {
    const response = await axios.get(
      `/users?page=${pageProps.pageIndex}&size=${pageProps.pageSize}`
    );
    return response.data;
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (user: User, thunkAPI) => {
    const response = await axios
      .post("/users", user)
      .then((response) => {
        thunkAPI.dispatch(setSnackbarOpen(true));
        thunkAPI.dispatch(setSnackbarSeverity("success"));
        thunkAPI.dispatch(
          setSnackbarMessage(`Successfully save user '${user.name}'`)
        );
        return response;
      })
      .catch((error) => {
        thunkAPI.dispatch(setSnackbarOpen(true));
        thunkAPI.dispatch(setSnackbarSeverity("error"));
        thunkAPI.dispatch(
          setSnackbarMessage(
            `Failed to create user '${user.name}': ${error.message}`
          )
        );
        return error;
      });
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    currentUserUpdated(state, action) {
      const user: User = action.payload;
      user.id = state.currentUser.id;
      state.currentUser = user;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.openEditUserDialog = true;
    },
    setEditUserDialogOpen(state, action) {
      state.openEditUserDialog = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload._embedded.users;
        state.totalUsersCount = action.payload.page.totalElements;
        state.totalPages = action.payload.page.totalPages;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.currentUser = buidDummyUser();
        EventBus.emit(UsersEventTypes.resetUserDetails);
        state.openEditUserDialog = false;
      });
  },
});

export const selectUsers = (state: RootState): User[] => state.users.users;
export const selectTotalUsersCount = (state: RootState): number =>
  state.users.totalUsersCount;
export const selectCurrentUser = (state: RootState): User =>
  state.users.currentUser;
export const selectOpenEditUserDialog = (state: RootState): boolean =>
  state.users.openEditUserDialog;

export const { currentUserUpdated, setCurrentUser, setEditUserDialogOpen } =
  usersSlice.actions;

export default usersSlice.reducer;
