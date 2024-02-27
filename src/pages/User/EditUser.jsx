import React, { useState } from "react"
import { TextField, Button, Typography, Box } from "@mui/material"
import { axiosInstance } from "../../configs/api/api"

const EditUserForm = ({ userData = {}, onClose }) => {
  const [firstName, setFirstName] = useState(userData.firstName ?? "")
  const [lastName, setLastName] = useState(userData.lastName ?? "")
  const [address, setAddress] = useState(userData.address ?? "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleEditUser = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await axiosInstance.put("/user/edit", {
        firstName: firstName,
        lastName: lastName,
        address: address
      })

      setFirstName("")
      setLastName("")
      setAddress("")

      console.log(response.data.message) // Log success message

      // Close the modal or perform other actions
      onClose()
    } catch (error) {
      console.error("Error editing user:", error.response?.data?.message || error.message)
      setError("Failed to edit user. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Typography variant="h4">Edit User</Typography>
      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        margin="normal"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" onClick={handleEditUser} disabled={loading} sx={{ mt: 2 }}>
        {loading ? "Updating..." : "Update User"}
      </Button>
    </Box>
  )
}

export default EditUserForm
