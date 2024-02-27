import { Badge, Box, IconButton, InputBase, useTheme } from "@mui/material"
import { ColorModeContext, tokens } from "../theme"
import {
  DarkModeOutlined,
  LightModeOutlined,
  Search,
  ShoppingCartOutlined
} from "@mui/icons-material"
import { useContext, useEffect } from "react"
import AuthButton from "../pages/Auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { changeQuery } from "../configs/store/slicer/querySlicer"
import { useSelector } from "react-redux"

const Navbar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)
  const [cartCount, setCartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.users)

  useEffect(() => {
    setCartCount(userData?.cart?.length)
  }, [userData])

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
          paddingX={5}
          paddingY={3}
          bgcolor={theme.palette.secondary.main}
        >
          <Box>
            <Link to={"/"}>
              <Box component={"img"} src="/Logo.png" sx={{ height: "50px", width: "50px" }} />
            </Link>
          </Box>
          <Box display="flex" gap="20px" alignItems="center" bgcolor={"white"} borderRadius={2}>
            <InputBase
              sx={{
                flex: 1,
                paddingY: "2px",
                paddingLeft: "20px",
                fontSize: "14px"
              }}
              value={searchQuery}
              onKeyDown={handleSearchEnter}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
            />

            <IconButton onClick={handleSearchClick}>
              <Search fontSize="small" />
            </IconButton>
          </Box>
          <Box display="flex" gap={2}>
            <IconButton sx={{ display: { xs: "none", sm: "flex" } }}>
              <Link to={"/cart"} reloadDocument>
                <Badge badgeContent={cartCount} color="primary">
                  <ShoppingCartOutlined sx={{ color: colors.primary[900] }} />
                </Badge>
              </Link>
            </IconButton>
            <IconButton onClick={colorMode.toggleColorMode}>
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
