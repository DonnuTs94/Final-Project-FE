import { Box, IconButton, InputBase, useTheme } from "@mui/material"
import { ColorModeContext } from "../theme"
import { DarkModeOutlined, LightModeOutlined, Search } from "@mui/icons-material"
import { useContext } from "react"
import AuthButton from "../pages/Auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { changeQuery } from "../configs/store/slicer/querySlicer"
import ShoppingCart from "./ShoppingCart"

const Navbar = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      dispatch(changeQuery(searchQuery))
      navigate(`/search?q=${searchQuery}`)
    }
  }
  const handleSearchClick = () => {
    dispatch(changeQuery(searchQuery))
    navigate(`/search?q=${searchQuery}`)
  }

  return (
    <header>
      <nav>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ paddingX: { xs: 2, sm: 5 }, paddingY: { xs: 2, sm: 3 } }}
          bgcolor={theme.palette.secondary.main}
        >
          <Box marginRight={{ xs: 4, sm: 0 }}>
            <Link to={"/"}>
              <Box
                component={"img"}
                src="/Logo.png"
                sx={{ height: "50px", width: "50px", objectFit: "cover" }}
              />
            </Link>
          </Box>
          <Box display="flex" gap="20px" alignItems="center" bgcolor={"white"} borderRadius={2}>
            <InputBase
              sx={{
                flex: 1,
                paddingY: "2px",
                paddingLeft: "20px",
                fontSize: "14px",
                color: "primary.dark"
              }}
              value={searchQuery}
              onKeyDown={handleSearchEnter}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
            />

            <IconButton onClick={handleSearchClick}>
              <Search fontSize="small" color="primary" />
            </IconButton>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <ShoppingCart />
            <IconButton
              sx={{ display: { xs: "none", sm: "block" }, marginLeft: 2 }}
              onClick={colorMode.toggleColorMode}
            >
              {theme.palette.mode === "dark" ? (
                <LightModeOutlined sx={{ color: "orange" }} />
              ) : (
                <DarkModeOutlined sx={{ color: "indigo" }} />
              )}
            </IconButton>
            <AuthButton />
          </Box>
        </Box>
      </nav>
    </header>
  )
}

export default Navbar
