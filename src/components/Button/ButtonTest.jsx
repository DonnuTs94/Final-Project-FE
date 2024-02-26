import React from "react"
import { Button } from "@mui/material"

const Buttons = (props) => {
  const {
    children,
    variant = "contained",
    type = "button",
    color = "secondary",
    onClick = () => {},
    sx
  } = props
  return (
    <>
      <Button color={color} variant={variant} type={type} onClick={onClick} sx={sx}>
        {children}
      </Button>
    </>
  )
}

export default Buttons
