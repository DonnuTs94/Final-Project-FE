import { Box, IconButton, InputBase, Typography, useTheme } from "@mui/material"
import { tokens } from "../theme"
import { Search } from "@mui/icons-material"

const Navbar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <header>
      <nav>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          bgcolor={colors.teal[500]}
        >
          <Box>
            <Typography variant="h5" color={colors.grey[500]}>
              E-Commerce Logo
            </Typography>
          </Box>
          <Box display="flex" gap="20px" alignItems="center">
            <InputBase
              sx={{
                flex: 1,
                paddingY: "2px",
                paddingLeft: "20px",
                fontSize: "14px",
                color: colors.grey[400],
                bgcolor: colors.white[800],
                borderRadius: "8px"
              }}
              placeholder="Search"
            />
            <IconButton>
              <Search sx={{ color: colors.grey[500] }} fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </nav>
    </header>
  )
}

export default Navbar
