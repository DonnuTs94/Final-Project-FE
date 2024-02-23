import { Container, Typography } from "@mui/material"
import { useSelector } from "react-redux"

const Homepage = () => {
  const { userData } = useSelector((state) => state.users)
  return (
    <>
      <Container sx={{ minHeight: "80vh" }}>
        <Typography variant="h3" color="accent">
          {userData && `Hi, ${userData.firstName}`}
        </Typography>
      </Container>
    </>
  )
}

export default Homepage
