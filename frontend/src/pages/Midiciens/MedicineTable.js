import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import ConfirmDeleteDialogue from "./ConfirmDeleteDialogue";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const columns = [
  { id: "Company", label: "Company", minWidth: 170 },
  { id: "Name", label: "Name", minWidth: 170 },
  { id: "Description", label: "Description", minWidth: 170 },
  { id: "Price", label: "Price", minWidth: 100 },
  { id: "actionsID", label: "Actions", minWidth: 100 },
];

function createData(Company, Name, Description, Price, actionsID) {
  return { Company, Name, Description, Price, actionsID };
}

export default function UserTable({ medicineList, deleteMedicine }) {
  const { currentUser } = useContext(UserContext);
  const {user} = useSelector( (state) => state.user);

  let columns = [];
  if (user?.isAdmin) {
    columns = [
      { id: "Company", label: "Company", minWidth: 170 },
      { id: "Name", label: "Name", minWidth: 170 },
      { id: "Description", label: "Description", minWidth: 170 },
      { id: "Price", label: "Price", minWidth: 100 },
      { id: "actionsID", label: "Actions", minWidth: 100 },
    ];
  } else {
    columns = [
      { id: "Company", label: "Company", minWidth: 170 },
      { id: "Name", label: "Name", minWidth: 170 },
      { id: "Description", label: "Description", minWidth: 170 },
      { id: "Price", label: "Price", minWidth: 100 },
    ];
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [openConfirmDeleteDialogue, setOpenConfirmDeleteDialogue] =
    React.useState(false);

  const navigate = useNavigate();

  const handleDeleteDialogueOpen = () => {
    setOpenConfirmDeleteDialogue(true);
  };

  const handleDeleteDialogueClose = () => {
    setOpenConfirmDeleteDialogue(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let rows = medicineList?.map((medicine) => {
    return createData(
      medicine.company,
      medicine.name,
      medicine.description,
      medicine.price,
      medicine._id
    );
  });

  return (
    <Paper
      sx={{
        width: "95%",
        overflow: "hidden",
        marginTop: 2,
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2) ",
      }}
    >
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (
                        column.id === "actionsID" &&
                        user?.isAdmin
                      ) {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Tooltip title="Edit" placement="top" arrow>
                              <EditIcon
                                className="mx-2"
                                style={{ color: "#ff6600", fontSize: 30 }}
                                onClick={() => {
                                  navigate(`/medicines/edit/${value}`);
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Delete" placement="top" arrow>
                              <DeleteIcon
                                className="mx-2"
                                style={{ color: "red", fontSize: 30 }}
                                onClick={handleDeleteDialogueOpen}
                              />
                            </Tooltip>
                            <ConfirmDeleteDialogue
                              title="Confirm Delete"
                              message="Are you sure you want to delete this record? This action cannot be undone."
                              open={openConfirmDeleteDialogue}
                              handleClose={handleDeleteDialogueClose}
                              handleDelete={() => {
                                deleteMedicine(value);
                                handleDeleteDialogueClose();
                              }}
                            />
                          </TableCell>
                        );
                      } else if (column.id === "Description") {
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ maxWidth: 200 }}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      } else if (column.id === "Price") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : "₹" + value}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          "& p": {
            marginTop: "auto",
            marginBottom: "auto",
          },
        }}
      />
    </Paper>
  );
}
