import { useState, useEffect } from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { axiosInstance } from "../../configs/api/api"
import { useTheme } from "@emotion/react"
import { Typography } from "@mui/material"

const columns = [
  { id: "no", label: "No", minWidth: "50px" },
  { id: "firstName", label: "First Name", minWidth: "100%" },
  { id: "lastName", label: "Last Name", minWidth: "100%" },
  { id: "email", label: "Email", minWidth: "100%" },
  { id: "address", label: "Address", minWidth: "100%" }
]

const UsersPage = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rows, setRows] = useState([])
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  })

  const theme = useTheme()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/user/")
        if (response.status !== 200) {
          throw new Error("Failed to fetch users")
        }
        const filterUsersByRoleId = response.data.users.filter((user) => user.Role.name === "user")
        setRows(filterUsersByRoleId)
      } catch (error) {
        console.error("Error fetching users:", error)
        setNotification({
          open: true,
          message: "Failed to fetch users",
          severity: "error"
        })
      }
    }

    fetchData()
  }, [])

  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setNotification({ ...notification, open: false })
  }

  return (
    <div>
      <Paper sx={{ width: "80vw", height: "85vh", overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px"
          }}
        >
          <Typography variant="h2">Users</Typography>
        </div>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    sx={{
                      backgroundColor: theme.palette.secondary.main
                    }}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">{row.firstName}</TableCell>
                    <TableCell align="left">{row.lastName}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(+event.target.value)
            setPage(0)
          }}
        />
      </Paper>
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleNotificationClose}>
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default UsersPage
