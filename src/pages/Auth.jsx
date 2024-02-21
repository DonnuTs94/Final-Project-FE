import React, { useState } from "react"
import { Box, Button, IconButton, Input, Typography } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

const AuthModal = ({
  usernameOrEmail,
  setUsernameOremail,
  usernameInput,
  setUsernameInput,
  emaiInput,
  setEmaiInput,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  variant,
  toggleVariant,
  toggleShowPassword,
  showPassword,
  disableButton,
  loginUser,
  registerUser
}) => {
  return (
    <>
      <Typography variant="h3" gutterBottom color={"white"} sx={{ mt: 3, textAlign: "center" }}>
        {variant === "login" ? "Sign in" : "Register"}
      </Typography>
      <Box>
        {variant === "login" && (
          <>
            <Typography color={"white"}>Username or Email</Typography>
            <Input
              value={usernameOrEmail}
              onChange={(e) => setUsernameOremail(e.target.value)}
              type="text"
              placeholder="Username or Email"
              sx={{
                fontSize: "16px",
                fontFamily: "inherit",
                padding: "0.25em 0.5em",
                backgroundColor: "#fff",
                border: "2px solid white",
                borderRadius: "4px",
                width: "350px",
                height: "50px",
                mb: 2
              }}
            />
          </>
        )}

        {variant === "register" && (
          <>
            <Typography color={"white"}>Username</Typography>
            <Input
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              type="text"
              placeholder="Username"
              sx={{
                fontSize: "16px",
                fontFamily: "inherit",
                padding: "0.25em 0.5em",
                backgroundColor: "#fff",
                border: "2px solid white",
                borderRadius: "4px",
                width: "350px",
                height: "50px",
                mb: 2
              }}
            />
            <Typography color={"white"}>Email</Typography>
            <Input
              value={emaiInput}
              onChange={(e) => setEmaiInput(e.target.value)}
              type="text"
              placeholder="Email"
              sx={{
                fontSize: "16px",
                fontFamily: "inherit",
                padding: "0.25em 0.5em",
                backgroundColor: "#fff",
                border: "2px solid white",
                borderRadius: "4px",
                width: "350px",
                height: "50px",
                mb: 2
              }}
            />
          </>
        )}
        <Typography color={"white"}>Password</Typography>

        <Box display={"flex"}>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Pasword"
            components={Input}
            sx={{
              fontSize: "16px",
              fontFamily: "inherit",
              padding: "0.25em 0.5em",
              backgroundColor: "#fff",
              border: "2px solid white",
              borderRadius: "4px",
              width: "350px",
              height: "50px",
              mb: 1
            }}
          />
          <IconButton color="default" onClick={() => toggleShowPassword()} sx={{ right: 45 }}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </Box>
        {variant === "register" && (
          <>
            <Typography color={"white"}>Confirm password</Typography>
            <Box display={"flex"}>
              <Input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                components={Input}
                sx={{
                  fontSize: "16px",
                  fontFamily: "inherit",
                  padding: "0.25em 0.5em",
                  backgroundColor: "#fff",
                  border: "2px solid white",
                  borderRadius: "4px",
                  width: "350px",
                  height: "50px",
                  mb: 1
                }}
              />
              <IconButton color="default" onClick={() => toggleShowPassword()} sx={{ right: 45 }}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </Box>
          </>
        )}
      </Box>
      <Button
        onClick={variant === "login" ? loginUser : registerUser}
        variant="contained"
        type="submit"
        // disabled={disableButton}
        sx={{ width: "350px", height: "50px", mt: 2 }}
      >
        {variant === "login" ? "Login" : "Sign up"}
      </Button>
      <Box display={"flex"} sx={{ mt: 1, mb: 3 }}>
        <Typography color={"white"} variant="h6" sx={{ mr: 1 }}>
          {variant === "login" ? "Dont have account?" : "Already have an account?"}
        </Typography>
        <Link onClick={toggleVariant}>
          <Typography color={"white"} variant="h6">
            {variant === "login" ? "Create an account" : "Login"}
          </Typography>
        </Link>
      </Box>
    </>
  )
}

export default AuthModal
