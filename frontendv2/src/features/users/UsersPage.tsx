import React from "react";
import UserForm from "../../../../frontend/src/user/UserForm";
import AddUserForm from "./AddUserForm";
import UsersTable from "./UsersTable";

export default function UsersPage() {
  return (
    <>
      <AddUserForm />
      <UsersTable />
    </>
  );
}
