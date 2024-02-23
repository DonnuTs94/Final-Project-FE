import { useEffect, useState } from "react"
import IconButton from "@mui/material/IconButton"
import { Box, Tab, Tabs, TextField, Typography, Input } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import ModalParent from "../components/Modal"
import { axiosInstance } from "../configs/api/api"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import InputLabel from "@mui/material/InputLabel"
import Buttons from "../components/Button/ButtonTest"
import FormControl from "@mui/material/FormControl"
import { logout, userLogin } from "../configs/store/slicer/userSlicer"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import MenuProfile from "../components/MenuProfile"

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogout])

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
      localStorage.setItem("auth_token", response.payload.token)
      setIsLogout(false)
      setEmail("")
      setPassword("")
      onClose()
      if (response.meta.requestStatus === "fulfilled" && response.payload.data.role === "admin") {
        navigate("/admin")
      } else {
        navigate("/")
        console.log("not admin")
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
      if (!response) {
        console.error("Register Failed")
      } else {
        console.log("Register success")
        window.location.href = "/"
      }
      // setAlertMessage("User successfull created", response)
      // setAlertStatus("success")
      setFirstName("")
      setLastName("")
      setEmailRegister("")
      setPasswordRegister("")
      setAddress("")
    } catch (err) {
      console.error("Error during register:", err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    setIsLogout(true)
    dispatch(logout())
  }

  return (
    <>
      {!userData ? (
        <Buttons onClick={isOpen}>Login</Buttons>
      ) : (
        <MenuProfile handleLogout={handleLogout} />
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
                    // <InputAdornment>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  }
                />
              </FormControl>
              <LoadingButton
                variant="contained"
                onClick={handleLogin}
                sx={{ m: "1", top: "30%" }}
                loading={loading}
                disabled={loading}
                loadingPosition="center"
              >
                Login
              </LoadingButton>
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              {/* Register */}
              <Typography variant="h5"></Typography>
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
                onChange={(e) => setFirstName(e.target.value)}
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
                onChange={(e) => setLastName(e.target.value)}
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
                onChange={(e) => setEmailRegister(e.target.value)}
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
                onChange={(e) => setPasswordRegister(e.target.value)}
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
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
              <Buttons onClick={handleRegister} sx={{ m: "1", top: "30%" }}>
                Register
              </Buttons>
            </Box>
          )}
        </Box>
      </ModalParent>
    </>
  )
}

export default TestPage
