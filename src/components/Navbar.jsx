import { Box, Button, IconButton, InputBase, Typography, useTheme } from "@mui/material"
import { ColorModeContext, tokens } from "../theme"
import {
  DarkModeOutlined,
  LightModeOutlined,
  Search,
  ShoppingCartOutlined
} from "@mui/icons-material"
import { useContext } from "react"

const Navbar = () => {
  const theme = useTheme()
  const colors = tokens(theme.pallete.mode)
  const colorMode = useContext(ColorModeContext)
  return (
    <header>
      <nav>
        <Box display="flex" justifyContent="space-between" alignItems="center" p={3}>
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
            <IconButton>
              <Search fontSize="small" />
            </IconButton>
          </Box>
          <Box>
            <IconButton>
              <ShoppingCartOutlined sx={{ color: colors.primary[900] }} />
            </IconButton>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.pallete.mode === "dark" ? (
                <LightModeOutlined sx={{ color: "orange" }} />
              ) : (
                <DarkModeOutlined sx={{ color: "indigo" }} />
              )}
            </IconButton>
            <Button variant="contained" sx={{ bgcolor: colors.secondary[400] }}>
              Login
            </Button>
          </Box>
        </Box>
      </nav>
    </header>
  )
}

export default Navbar
