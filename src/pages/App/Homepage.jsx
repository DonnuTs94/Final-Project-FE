import { Box } from "@mui/material"
import Banners from "../../components/Banners"
import CardProductHome from "../../components/CardProductHome"
import ProductList from "../Product/ProductList"

const Homepage = () => {
  return (
    <>
      <Box display={"flex"} flexDirection={"column"} px={5} pt={3}>
        <Banners />
        <CardProductHome />
        <ProductList />
      </Box>
    </>
  )
}

export default Homepage
