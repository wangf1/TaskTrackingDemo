import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import ApiUtils from "../utils/ApiUtils";
import EventBus from "../utils/EventBus";

import styled from "styled-components";
import { useTable, usePagination } from "react-table";
import Grid from "@mui/material/Grid";

import UserForm from "./UserForm";
import EditUserDialog from "./EditUserDialog";
import UserCommon from "./UserUtils";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const TableStyles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid gray;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid gray;
      border-right: 1px solid gray;
      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

const tablePropsRef = {};

function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  tablePropsRef,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    usePagination
  );

  tablePropsRef["gotoPage"] = gotoPage;
  tablePropsRef["pageIndex"] = pageIndex;
  tablePropsRef["pageSize"] = pageSize;
  tablePropsRef["pageCount"] = pageCount;

  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing {page.length} of ~{controlledPageCount * pageSize}{" "}
                results
              </td>
            )}
          </tr>
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function Users() {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: (props) => {
          const Edit = () => (
            <a
              className="App-link"
              href={props.row.values.id + "edit"}
              onClick={(e) => {
                e.preventDefault();
                setEditDialogOpen(true);
                const clonedUser = structuredClone(props.row.values);
                setCurrentUser(clonedUser);
              }}
            >
              Edit
            </a>
          );
          const Delete = () => (
            <a
              className="App-link"
              href={props.row.values.id + "delete"}
              onClick={(e) => {
                e.preventDefault();
                alert("Not implement yet.");
              }}
            >
              Delete
            </a>
          );
          return (
            <div>
              <Edit /> <Delete />
            </div>
          );
        },
      },
    ],
    []
  );
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    phone: "",
    email: "",
    roles: "",
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const fetchData = useCallback(({ pageSize, pageIndex }) => {
    setLoading(true);
    fetchDateDirectly(pageSize, pageIndex)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const fetchDateDirectly = function (pageSize, pageIndex) {
    return axios
      .get(ApiUtils.getApiUrl(`/users?page=${pageIndex}&size=${pageSize}`))
      .then((response) => {
        setUsers(response.data._embedded.users);
        setPageCount(response.data.page.totalPages);
      });
  };

  EventBus.on("showSnackBar", (e) => {
    setSnackbarOpen(true);
    let message;
    if (e.severity == "success") {
      message = `Successfully create user with name '${currentUser.name}'.`;
    } else {
      message = `Fail to create user with name '${currentUser.name}'.`;
    }
    setSnackbarMessage(message);
    setSeverity(e.severity);
  });

  EventBus.on("fetchData", (e = {}) => {
    let pageIndex = tablePropsRef.pageIndex;
    if (e.goLastPage) {
      pageIndex = tablePropsRef.pageCount - 1;
    }
    fetchDateDirectly(tablePropsRef.pageSize, pageIndex);
  });

  const onClickReset = function (e) {
    setCurrentUser({
      name: "",
      phone: "",
      email: "",
      roles: "",
    });
    EventBus.emit("resetForm");
  };
  const onClickSave = function (e) {
    UserCommon.saveUser(currentUser)
      .then(function (response) {
        setSnackbarOpen(true);
        setSnackbarMessage(
          `Successfully create user with name '${currentUser.name}'.`
        );
        setSeverity("success");
        EventBus.emit("fetchData", { goLastPage: true });
        console.log(response);
      })
      .catch(function (error) {
        setSnackbarOpen(true);
        setSnackbarMessage(
          `Fail to create user with name '${currentUser.name}'.`
        );
        setSeverity("error");
        console.log(error);
      });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2} container justifyContent="flex-end">
          <Grid item xs={12}>
            <UserForm user={currentUser} />
          </Grid>
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

        <Grid item xs={10}>
          <TableStyles>
            <Table
              columns={columns}
              data={users}
              fetchData={fetchData}
              loading={loading}
              pageCount={pageCount}
              tablePropsRef={tablePropsRef}
            />
          </TableStyles>
        </Grid>

        <Grid item xs={3}>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={(e) => {
              setSnackbarOpen(false);
            }}
          >
            <Alert severity={severity}>{snackbarMessage}</Alert>
          </Snackbar>
        </Grid>
      </Grid>

      <EditUserDialog
        openState={[editDialogOpen, setEditDialogOpen]}
        userState={[currentUser, setCurrentUser]}
      />
    </>
  );
}

export default Users;
