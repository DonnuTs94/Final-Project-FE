import React from "react"
import { Button } from "@mui/material"

const Buttons = (props) => {
  const {
    children,
    variant = "contained",
    type = "button",
    color = "secondary",
    onClick = () => {}
  } = props
  return (
    <>
      <Button
        color={color}
        variant={variant}
        type={type}
        onClick={onClick}
        sx={{ borderRadius: "8px" }}
      >
        {children}
      </Button>
    </>
  )
}

export default Buttons
