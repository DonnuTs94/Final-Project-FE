import React, { useState } from "react"
import { TextField, Typography, Box } from "@mui/material"
import { axiosInstance } from "../../configs/api/api"
import { toast, ToastContainer } from "react-toastify"
import Buttons from "../../components/Button/ButtonTest"

const EditUserForm = ({ userData = {}, onClose }) => {
  const [firstName, setFirstName] = useState(userData.firstName ?? "")
  const [lastName, setLastName] = useState(userData.lastName ?? "")
  const [address, setAddress] = useState(userData.address ?? "")

  const handleEditUser = async () => {
    try {
      if (!firstName || !lastName || !address) {
        toast.error("Please fill in all fields", {
          position: "bottom-center"
        })
        return
      }

      const response = await axiosInstance.put("/user/edit", {
        firstName: firstName,
        lastName: lastName,
        address: address
      })

      setFirstName("")
      setLastName("")
      setAddress("")

      toast.success("Success edit data user", {
        position: "bottom-center"
      })
    } catch (error) {
      console.log("Error editing user:", error)

      toast.error("Failed edit data user", {
        position: "bottom-center"
      })
    }
  }

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "55px"
      }}
    >
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

        <Buttons variant="contained" onClick={handleEditUser} sx={{ mt: 2 }}>
          Update User
        </Buttons>
      </Box>
    </Box>
  )
}

export default EditUserForm
