import React, { useState, useEffect } from "react"
import Modal from "@mui/material/Modal"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

const AdminTableModal = ({
  open,
  handleClose,
  title,
  actionType,
  data,
  handleDelete,
  handleSave
}) => {
  const [category, setCategory] = useState(data ? data.name : "")

  useEffect(() => {
    if (data) {
      setCategory(data.name)
    }
  }, [data])

  const onChangeInput = (event) => {
    setCategory(event.target.value)
  }

  const handleSaveChanges = async () => {
    try {
      await handleSave(category)
      handleClose()
      setCategory("")
    } catch (error) {
      console.error("Error saving category:", error)
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <Paper
          sx={{
            width: "50vw",
            maxHeight: "50vh",
            overflow: "auto",
            padding: "16px"
          }}
        >
          <h2>{title}</h2>
          {actionType === "add" && (
            <div>
              <TextField
                value={category}
                onChange={onChangeInput}
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                Save
              </Button>
            </div>
          )}
          {actionType === "edit" && (
            <div>
              <TextField
                value={category}
                onChange={onChangeInput}
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                Save
              </Button>
            </div>
          )}
          {actionType === "delete" && (
            <div>
              <p>Are you sure you want to delete this item?</p>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Yes, Delete
              </Button>
              <Button variant="contained" color="default" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          )}
        </Paper>
      </div>
    </Modal>
  )
}

export default AdminTableModal
