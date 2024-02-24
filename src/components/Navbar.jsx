import { Box, IconButton, InputBase, Typography, useTheme } from "@mui/material"
import { ColorModeContext, tokens } from "../theme"
import {
  DarkModeOutlined,
  LightModeOutlined,
  Search,
  ShoppingCartOutlined
} from "@mui/icons-material"
import { useContext } from "react"
import AuthButton from "../pages/Auth"
import SearchBar from "./Card/SearchBar"

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
        >
          <Box>
            <Typography variant="h5">E-Commerce Logo</Typography>
          </Box>
          <Box display="flex" gap="20px" alignItems="center">
            <InputBase
              sx={{
                flex: 1,
                paddingY: "2px",
                paddingLeft: "20px",
                fontSize: "14px",
                borderRadius: "8px"
              }}
              placeholder="Search"
            />
            <SearchBar>
              <IconButton>
                <Search fontSize="small" />
              </IconButton>
            </SearchBar>
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
