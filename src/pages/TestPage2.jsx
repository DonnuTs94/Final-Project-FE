import React, { useState } from "react"
import { Modal, Box, Tab, Tabs, TextField, Button, Typography, Input } from "@mui/material"
import ModalParent from "../components/Modal"

const TestPage = () => {
  const [open, setOpen] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  const isOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleLogin = async () => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    try {
      // Replace the following URL with your actual login endpoint
      const response = await fetch("https://example.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      })

      if (response.ok) {
        // Successful login
        console.log("Login successful")
        // You may want to handle redirecting or updating the UI here
      } else {
        // Handle failed login
        console.error("Login failed")
      }
    } catch (error) {
      console.error("Error during login:", error)
    }
    console.log("Login button clicked")
  }

  const handleRegister = () => {
    // Handle register logic here
    console.log("Register button clicked")
  }

  return (
    <div>
      <div>
        <Button variant="outlined" onClick={isOpen}>
          ClickMey
        </Button>

        <ModalParent onOpen={open} onClose={onClose} title={"Halloo"}>
          <Box
            sx={{
              width: 300,
              p: 3,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>

            {tabValue === 0 && (
              <Box>
                <Typography variant="h5"></Typography>
                <TextField label="Username" fullWidth margin="normal" />
                <TextField label="Password" type="password" fullWidth margin="normal" />
                <Button variant="contained" onClick={handleLogin}>
                  Login
                </Button>
              </Box>
            )}

            {tabValue === 1 && (
              <Box>
                <Typography variant="h5"></Typography>
                <TextField label="Username" fullWidth margin="normal" />
                <TextField label="Email" type="email" fullWidth margin="normal" />
                <Input placeholder="Email" type="email" label="Email" />
                <TextField label="Password" type="password" fullWidth margin="normal" />
                <Button variant="contained" onClick={handleRegister}>
                  Register
                </Button>
              </Box>
            )}
          </Box>
        </ModalParent>
      </div>
    </div>
  )
}

export default TestPage
