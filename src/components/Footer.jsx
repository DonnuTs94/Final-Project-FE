import { Box, Typography, useTheme } from "@mui/material"

const Footer = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        textAlign: "center",
        padding: "20px 0",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%"
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} CodeMasters. All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer
