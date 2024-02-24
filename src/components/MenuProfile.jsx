import { Logout } from "@mui/icons-material"
import { Button, Divider, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const MenuProfile = ({ handleLogout }) => {
  const { userData } = useSelector((state) => state.users)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Tooltip title="Account settings">
        <Button
          onClick={handleClick}
          color="inherit"
          sx={{ ml: 2, p: 1, fontWeight: "bold" }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          Hi, {userData?.firstName}
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        {userData?.Role?.name === "admin" ? (
          <MenuItem onClick={handleClose}>
            <Link to={"/admin"}>Admin Dashboard</Link>
          </MenuItem>
        ) : null}
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default MenuProfile
