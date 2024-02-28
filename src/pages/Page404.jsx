import { Box, Button } from "@mui/material"
import { Link } from "react-router-dom"

const Page404 = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      flexDirection={"column"}
    >
      <Box width="50%" height="50%">
        <Box
          component={"img"}
          src="/404.png"
          alt="404 Not Found"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>
      <Button sx={{ color: "black", maxWidth: "50%", mt: 2 }} variant="contained">
        <Link to="/">Back to home</Link>
      </Button>
    </Box>
  )
}

export default Page404
