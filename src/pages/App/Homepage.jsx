import { Box } from "@mui/material"
import Banners from "../../components/Banners"
import CardProductHome from "../../components/CardProductHome"

const Homepage = () => {
  return (
    <>
      <Box display={"flex"} flexDirection={"column"} px={5} pt={3}>
        <Banners />
        <CardProductHome />
      </Box>
    </>
  )
}

export default Homepage
