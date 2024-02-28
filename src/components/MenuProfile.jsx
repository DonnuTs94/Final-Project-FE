import { useTheme } from "@emotion/react"
import { DarkModeOutlined, LightModeOutlined, Logout } from "@mui/icons-material"
import { Button, Divider, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ColorModeContext } from "../theme"

const MenuProfile = ({ handleLogout }) => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const { userData } = useSelector((state) => state.users)
  const [showDashboardMenu, setDashboardMenu] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  useEffect(() => {
    if (userData?.Role?.name === "admin") setDashboardMenu(true)
  }, [userData])
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
          sx={{
            // ml: 2,
            p: 2,
            width: "max-content",
            fontWeight: "bold",
            fontSize: { xs: "10px", md: "12px" }
          }}
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
        <Link to={"user/edit"}>
          <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>
          <Link to={"/myorder"}>My Order</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ display: { xs: "flex", sm: "none" } }}>
          <Link to={"/cart"}>
            My Cart ({userData?.cart?.length === 0 ? 0 : userData?.cart?.length})
          </Link>
        </MenuItem>
        {showDashboardMenu ? (
          <MenuItem onClick={handleClose}>
            <Link to={"/admin"}>Admin Dashboard</Link>
          </MenuItem>
        ) : null}
        <Divider />
        <MenuItem
          sx={{ display: { xs: "flex", md: "none" }, justifyContent: "space-between" }}
          onClick={colorMode.toggleColorMode}
        >
          {theme.palette.mode === "dark" ? "Light" : "Dark"}
          {theme.palette.mode === "dark" ? (
            <LightModeOutlined sx={{ color: "orange" }} />
          ) : (
            <DarkModeOutlined sx={{ color: "indigo" }} />
          )}
        </MenuItem>
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
