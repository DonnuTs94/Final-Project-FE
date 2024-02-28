import { useContext, useState } from "react"
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { Box, IconButton, Paper, Typography, useTheme } from "@mui/material"
import { Link } from "react-router-dom"
import { ColorModeContext } from "../theme"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined"
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import MapOutlinedIcon from "@mui/icons-material/MapOutlined"
import ReplyIcon from "@mui/icons-material/Reply"
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { logout } from "../configs/store/slicer/userSlicer"

const Item = ({ title, to, icon, selected, setSelected }) => {
  const dispatch = useDispatch()
  const handleLogoutButton = (e) => {
    if (e.target.innerText === "Logout") {
      localStorage.removeItem("auth_token")
      dispatch(logout())
    }
  }
  return (
    <MenuItem active={selected === title} onClick={() => setSelected(title)} icon={icon}>
      <Link to={to} onClick={(e) => handleLogoutButton(e)}>
        <Typography>{title}</Typography>
      </Link>
    </MenuItem>
  )
}

const SidebarPro = () => {
  const theme = useTheme()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState("Dashboard")
  const colorMode = useContext(ColorModeContext)

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        "& .pro-sidebar-inner": {
          color: "inherit !important"
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important"
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important"
        },
        "& .pro-inner-item:hover": {
          backgroundColor: theme.palette.mode === "dark" ? "#868dfb" : "#444444 !important"
        },
        "& .pro-menu-item.active": {
          backgroundColor: theme.palette.mode === "dark" ? "#6870fa" : "#fffccc !important"
        }
      }}
    >
      <Sidebar
        backgroundColor="inherit"
        rootStyles={{
          height: "100%"
        }}
        collapsed={isCollapsed}
      >
        <Menu
          iconShape="square"
          menuItemStyles={{
            button: {
              [`&:hover`]: {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.text.default
              }
            }
          }}
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0"
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3">ADMIN</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* MENU ITEMS */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "80vh"
            }}
          >
            <Box>
              <Item
                title="Dashboard"
                to="/admin"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
                Data
              </Typography>
              <Item
                title="Category"
                to="/admin/categories"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Products"
                to="/admin/products"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Order"
                to="/admin/orders"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Users"
                to="/admin/users"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Back to App"
                to="/"
                icon={<ReplyIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
            <Box sx={{ marginTop: "auto", display: "flex", flexDirection: "column" }}>
              {" "}
              <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
                Logout
              </Typography>
              <Item
                title="Logout"
                to="/admin"
                icon={<MapOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <IconButton sx={{ alignSelf: "center" }} onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <LightModeOutlined sx={{ color: "orange" }} />
                ) : (
                  <DarkModeOutlined sx={{ color: "indigo" }} />
                )}
              </IconButton>
            </Box>
          </Box>
        </Menu>
      </Sidebar>
    </Paper>
  )
}

export default SidebarPro
