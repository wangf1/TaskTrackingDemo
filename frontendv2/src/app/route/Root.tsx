import { Stack } from "@mui/system";
import React from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import UsersPage from "../../features/users/UsersPage";

import UsersTable from "../../features/users/UsersTable";
function Layout() {
  return (
    <div>
      <Stack spacing={2} direction="row">
        <nav>
          <ul>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
          </ul>
        </nav>
        {/* <hr /> */}
        <Outlet />
      </Stack>
    </div>
  );
}
function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
export default function Root() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<UsersPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/tasks" element={<>Tasks Not Implement Yet</>} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
