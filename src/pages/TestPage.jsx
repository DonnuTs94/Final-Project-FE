import React, { useState } from "react"
import IconButton from "@mui/material/IconButton"
import { Box, Tab, Tabs, TextField, Button, Typography, Input } from "@mui/material"
import ModalParent from "../components/Modal"
import { axiosInstance } from "../configs/api/api"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import InputLabel from "@mui/material/InputLabel"
import InputAdornment from "@mui/material/InputAdornment"
import Buttons from "../components/Button/ButtonTest"
import FormControl from "@mui/material/FormControl"

const TestPage = ({ openModalLogin, onCloseModalLogin }) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const [open, setOpen] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  const isOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleLogin = async () => {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    try {
      const response = await axiosInstance.post("/user/register", {
        body: JSON.stringify({ email, password })
      })
      if (response.ok) {
        // Successful login
        console.log("Login successful")
        // You may want to handle redirecting or updating the UI here
      } else {
        // Handle failed login
        console.error("Login failed")
      }
    } catch (err) {
      console.error("Error during login:", err)
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
        <Buttons onClick={isOpen}>Login</Buttons>

        <ModalParent
          onOpen={open}
          onClose={onClose}
          openModalLogin={openModalLogin}
          onCloseModalLogin={onCloseModalLogin}
        >
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
                {/* <TextField label="Email" type="email" fullWidth margin="normal" /> */}
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  type="email"
                  fullWidth
                  margin="normal"
                />

                <FormControl sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                  <Input
                    id="standard-adornment-password"
                    fullWidth
                    margin="normal"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button variant="contained" onClick={handleLogin} sx={{ m: "1", top: "30%" }}>
                  Login
                </Button>
              </Box>
            )}

            {tabValue === 1 && (
              <Box>
                <Typography variant="h5"></Typography>
                {/* <Input placeholder="FirstName" fullWidth margin="normal" /> */}
                <Input
                  sx={{
                    outline: "none",
                    borderBottom: "1px solid #757879",
                    height: "40px",
                    backgroundColor: "transparent",
                    width: "100%",
                    paddingLeft: "3px",
                    "&::placeholder": {
                      color: "#757879"
                    }
                  }}
                  type="text"
                  placeholder="Firstname"
                />
                <Input
                  sx={{
                    outline: "none",
                    borderBottom: "1px solid #757879",
                    height: "40px",
                    backgroundColor: "transparent",
                    width: "100%",
                    paddingLeft: "3px",
                    "&::placeholder": {
                      color: "#757879"
                    }
                  }}
                  type="text"
                  placeholder="Lastname"
                />
                <Input
                  sx={{
                    outline: "none",
                    borderBottom: "1px solid #757879",
                    height: "40px",
                    backgroundColor: "transparent",
                    width: "100%",
                    paddingLeft: "3px",
                    "&::placeholder": {
                      color: "#757879"
                    }
                  }}
                  type="text"
                  placeholder="Email"
                />
                <Input
                  sx={{
                    outline: "none",
                    borderBottom: "1px solid #757879",
                    height: "40px",
                    backgroundColor: "transparent",
                    width: "100%",
                    paddingLeft: "3px",
                    "&::placeholder": {
                      color: "#757879"
                    }
                  }}
                  type="password"
                  placeholder="Password"
                />
                <Input
                  sx={{
                    outline: "none",
                    borderBottom: "1px solid #757879",
                    height: "40px",
                    backgroundColor: "transparent",
                    width: "100%",
                    paddingLeft: "3px",
                    "&::placeholder": {
                      color: "#757879"
                    }
                  }}
                  type="text"
                  placeholder="Address"
                />
                <Buttons onClick={handleRegister} sx={{ m: "1", top: "30%" }}>
                  Register
                </Buttons>
              </Box>
            )}
          </Box>
        </ModalParent>

        {/* <Buttons>asjdnsa</Buttons> */}
      </div>
    </div>
  )
}

export default TestPage
