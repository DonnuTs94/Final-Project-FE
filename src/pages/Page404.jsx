import { Box, Button } from "@mui/material"
import { Link } from "react-router-dom"

const Page404 = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection={"column"}
    >
      <Box width="60%">
        <Box
          component={"img"}
          src="/404.png"
          alt="404 Not Found"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Button
        sx={{ color: "black", width: "200px", height: "50px", maxWidth: "100%", mt: 2 }}
        variant="contained"
      >
        <Link to="/">Back to home</Link>
      </Button>
    </Box>
  )
}

export default Page404
