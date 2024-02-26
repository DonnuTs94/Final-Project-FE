import { useState, useEffect } from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import Button from "@mui/material/Button"
import { axiosInstance } from "../configs/api/api"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import AdminTableModal from "./AdminTableModal"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useTheme } from "@emotion/react"
import { Typography } from "@mui/material"

const columns = [
  { id: "no", label: "No", minWidth: "50px" },
  { id: "name", label: "Name", minWidth: "100%" },
  { id: "actions", label: "Actions", minWidth: "150px" }
]

const CategoryPage = () => {
  const theme = useTheme()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rows, setRows] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  })
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState(null)

  const getAllCategoryData = async () => {
    try {
      const response = await axiosInstance.get("/categories")
      setRows(response.data.data)
    } catch (error) {
      console.error("Error fetching category data:", error)
    }
  }

  const isDuplicateNameOnEdit = (name, id) => {
    return rows.some((row) => row.name === name && row.id !== id)
  }

  useEffect(() => {
    getAllCategoryData()
  }, [])

  const handleOpenModal = (category) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleEdit = (id) => {
    const category = rows.find((row) => row.id === id)
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const handleDeleteConfirmation = (id) => {
    const category = rows.find((row) => row.id === id)
    setCategoryToDelete(category)
    setDeleteConfirmationOpen(true)
  }

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false)
  }

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/categories/delete/${categoryToDelete.id}`, {})
      const updatedRows = rows.filter((row) => row.id !== categoryToDelete.id)
      setRows(updatedRows)
      setNotification({
        open: true,
        message: "Category deleted successfully!",
        severity: "success"
      })
      setDeleteConfirmationOpen(false)
    } catch (error) {
      console.error("Error deleting category:", error)
    }
  }

  const handleSave = async (categoryData) => {
    try {
      let response
      if (selectedCategory && isDuplicateNameOnEdit(categoryData, selectedCategory.id)) {
        console.error("Category with the same name already exists!")
        return
      }

      if (selectedCategory) {
        response = await axiosInstance.put(`/categories/update/${selectedCategory.id}`, {
          name: categoryData
        })
        const updatedRows = rows.map((row) =>
          row.id === selectedCategory.id ? { ...row, ...categoryData } : row
        )
        setRows(updatedRows)
        setNotification({
          open: true,
          message: "Category updated successfully!",
          severity: "success"
        })
      } else {
        response = await axiosInstance.post("/categories/create", {
          name: categoryData
        })
        const newCategory = response.data
        setRows([...rows, newCategory])
        setNotification({
          open: true,
          message: "Category added successfully!",
          severity: "success"
        })
      }
      handleCloseModal()
      getAllCategoryData()
    } catch (error) {
      console.error("Error saving category:", error)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

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
          <Typography variant="h2">Categories</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal(null)}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </div>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.id === "actions" ? "right" : column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: theme.palette.secondary.main
                    }}
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      if (column.id === "actions") {
                        return (
                          <TableCell key={column.id} align="right">
                            <Button
                              color="warning"
                              size="large"
                              onClick={() => handleEdit(row.id)}
                              style={{ marginRight: "8px" }}
                              startIcon={<EditIcon />}
                            >
                              Edit
                            </Button>
                            <Button
                              color="error"
                              size="large"
                              onClick={() => handleDeleteConfirmation(row.id)}
                              startIcon={<DeleteIcon />}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        )
                      } else if (column.id === "no") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {index + 1}
                          </TableCell>
                        )
                      } else {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )
                      }
                    })}
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
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <AdminTableModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        title={selectedCategory ? "Edit Category" : "Add Category"}
        actionType={selectedCategory ? "edit" : "add"}
        data={selectedCategory}
        handleDelete={() => handleDelete(selectedCategory.id)}
        handleSave={handleSave}
      />
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleNotificationClose}>
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleCloseDeleteConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CategoryPage
