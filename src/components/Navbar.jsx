import { Box, IconButton, InputBase, useTheme } from "@mui/material"
import { ColorModeContext, tokens } from "../theme"
import {
  DarkModeOutlined,
  LightModeOutlined,
  Search,
  ShoppingCartOutlined
} from "@mui/icons-material"
import { useContext } from "react"
import AuthButton from "../pages/Auth"
import { Link } from "react-router-dom"

const Navbar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)

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
              placeholder="Search"
            />
            <IconButton>
              <Search fontSize="small" />
            </IconButton>
          </Box>
          <Box display="flex" gap={2}>
            <IconButton>
              <ShoppingCartOutlined sx={{ color: colors.primary[900] }} />
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
