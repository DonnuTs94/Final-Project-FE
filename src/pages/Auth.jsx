import { useEffect, useState } from "react"
import IconButton from "@mui/material/IconButton"
import { Box, Tab, Tabs, TextField, Typography, Input } from "@mui/material"
import ModalParent from "../components/Modal"
import { axiosInstance } from "../configs/api/api"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import InputLabel from "@mui/material/InputLabel"
import Buttons from "../components/Button/ButtonTest"
import FormControl from "@mui/material/FormControl"
import { getUserData, logout, userLogin } from "../configs/store/slicer/userSlicer"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import MenuProfile from "../components/MenuProfile"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const TestPage = ({ openModalLogin, onCloseModalLogin }) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const [open, setOpen] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogout, setIsLogout] = useState(false)
  const isOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailRegister, setEmailRegister] = useState("")
  const [passwordRegister, setPasswordRegister] = useState("")
  const [address, setAddress] = useState("")

  const { userData, loading } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLogout) {
      localStorage.removeItem("auth_token")
    } else {
      dispatch(getUserData())
    }
  }, [isLogout, dispatch])

  const userDataLogin = {
    email,
    password
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await dispatch(userLogin(userDataLogin))
      if (response.payload === "Please provide email and password") {
        toast.info("Please provide email and password", {
          position: "bottom-center"
        })
      }

      if (
        response.payload ===
        "Password must contain at least 8 characters, alphanumeric, one uppercase letter, one lowercase letter and symbol"
      ) {
        toast.info("Please provide email and password", {
          position: "bottom-center"
        })
      }

      if (response.payload.message === "Login Success") {
        localStorage.setItem("auth_token", response.payload.token)
        setIsLogout(false)
        setEmail("")
        setPassword("")
        setShowPassword(false)
        onClose()
        toast.success("Welcome :)", {
          position: "bottom-center"
        })
      }
      if (response.meta.requestStatus === "fulfilled" && response.payload.data.role === "admin") {
        navigate("/admin", { replace: true })
      } else {
        navigate("/")
      }
    } catch (err) {
      console.error("Error during login:", err)
    }
  }

  const handleRegister = async () => {
    try {
      const response = await axiosInstance.post("/user/register", {
        firstName: firstName,
        lastName: lastName,
        email: emailRegister,
        password: passwordRegister,
        address: address
      })

      if (response.data.message === "Register Success") {
        toast.success("Register Success", {
          position: "bottom-center"
        })
        setTabValue(0)
      }
    } catch (err) {
      console.error("Error during register:", err)
      if (err.response.data.message === "User already exists") {
        toast.info("User already exists", {
          position: "bottom-center"
        })
      }

      if (err.response.data.message === "Please enter an email") {
        toast.info("Wrong email format", {
          position: "bottom-center"
        })
      }

      if (
        err.response.data.message ===
        "Password must have minimum 8 characters , at least 1 number, and at least 1 special character"
      ) {
        toast.info(
          "Password must have minimum 8 characters , at least 1 number, and at least 1 special character",
          {
            position: "bottom-center"
          }
        )
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    setIsLogout(true)
    dispatch(logout())
    navigate("/")
  }

  return (
    <>
      {!loading && userData ? (
        <MenuProfile handleLogout={handleLogout} />
      ) : (
        <Buttons
          onClick={isOpen}
          sx={{
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "5px",
            transition: "background-color 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#45a049"
            }
          }}
        >
          Login
        </Buttons>
      )}

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
            <Box sx={{ width: "100%" }}>
              {/* Login */}
              <Typography variant="h5"></Typography>
              <TextField
                id="standard-basic"
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="standard"
                type="email"
                fullWidth
                margin="normal"
                sx={{ m: 1, width: "80%" }}
              />

              <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  }
                />
              </FormControl>

              <Box display="flex" justifyContent="center" mt={2}>
                <Buttons
                  onClick={handleLogin}
                  sx={{
                    backgroundColor: "#4CAF50",
                    borderRadius: 50,
                    border: 0,
                    color: "white",
                    height: 48,
                    padding: "0 30px",
                    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                    transition: "background-color 0.3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#45a049"
                    }
                  }}
                >
                  Login
                </Buttons>
              </Box>
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              {/* Register */}
              <TextField
                sx={{
                  outline: "none",
                  height: "40px",
                  backgroundColor: "transparent",
                  width: "100%",
                  paddingLeft: "3px",
                  "&::placeholder": {
                    color: "#757879"
                  }
                }}
                type="text"
                onChange={(e) => setEmailRegister(e.target.value)}
                placeholder="Email"
                size="small"
              />
              <TextField
                sx={{
                  outline: "none",
                  height: "40px",
                  backgroundColor: "transparent",
                  width: "100%",
                  paddingLeft: "3px",
                  "&::placeholder": {
                    color: "#757879"
                  }
                }}
                type="password"
                onChange={(e) => setPasswordRegister(e.target.value)}
                placeholder="Password"
                size="small"
              />
              <TextField
                sx={{
                  outline: "none",
                  height: "40px",
                  backgroundColor: "transparent",
                  width: "100%",
                  paddingLeft: "3px",
                  "&::placeholder": {
                    color: "#757879"
                  }
                }}
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Firstname"
                size="small"
              />

              <TextField
                sx={{
                  outline: "none",
                  height: "40px",
                  backgroundColor: "transparent",
                  width: "100%",
                  paddingLeft: "3px",
                  "&::placeholder": {
                    color: "#757879"
                  }
                }}
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Lastname"
                size="small"
              />
              <TextField
                sx={{
                  outline: "none",
                  height: "40px",
                  backgroundColor: "transparent",
                  width: "100%",
                  paddingLeft: "3px",
                  "&::placeholder": {
                    color: "#757879"
                  }
                }}
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                size="small"
              />
              <Box display="flex" justifyContent="center" mt={2} sx={{}}>
                <Buttons
                  onClick={handleRegister}
                  sx={{
                    backgroundColor: "#4CAF50",
                    borderRadius: 50,
                    border: 0,
                    color: "white",
                    height: 48,
                    padding: "0 30px",
                    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                    transition: "background-color 0.3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#45a049"
                    }
                  }}
                >
                  Register
                </Buttons>
              </Box>
            </Box>
          )}
        </Box>
      </ModalParent>
      <ToastContainer />
    </>
  )
}

export default TestPage
