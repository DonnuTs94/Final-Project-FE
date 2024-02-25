import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Typography,
  useTheme
} from "@mui/material"
import { axiosInstance } from "../configs/api/api"
import { useEffect, useState } from "react"
import { BASE_URL } from "../configs/constant/baseUrl"
import { Link } from "react-router-dom"

const CardProductHome = () => {
  const [products, setProducts] = useState([])

  const theme = useTheme()
  const getProductData = async () => {
    try {
      const response = await axiosInstance("/product")
      setProducts(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const convertPriceWithCommas = (price) => {
    if (typeof price === "number" && !isNaN(price)) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    return ""
  }

  useEffect(() => {
    getProductData()
  }, [])
  return (
    <>
      <Box px={{ xl: 15, s: 5 }} mt={{ xs: 2 }}>
        <Paper elevation={6} sx={{ borderRadius: "10px" }}>
          <Box pt={2} mr={2} display={"flex"} gap={3} alignItems={"center"} ml={2}>
            <Typography variant="h2">Product List</Typography>
            <Typography sx={{ cursor: "pointer" }} color={theme.palette.secondary.main}>
              See More
            </Typography>
          </Box>
          <Box
            display={"grid"}
            gridTemplateColumns={"1fr"}
            gap={2}
            p={2}
            sx={{
              "@media (min-width: 600px)": {
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))"
              },
              "@media (min-width: 1280px)": {
                gridTemplateColumns: "repeat( minmax(250px, 1fr))", // Adjusted card width for larger screens
                maxWidth: "1280px", // Adjusted maximum width for larger screens
                margin: "0 auto" // Centering the grid
              }
            }}
          >
            {products.slice(0, 5).map((product, i) => (
              <Card key={i} sx={{ width: "100%" }}>
                <Link to={`product/${product.id}`}>
                  <CardActionArea>
                    <CardMedia
                      sx={{ width: "100%", height: "200px" }}
                      component={"img"}
                      src={BASE_URL + product?.productImages[0]?.imageUrl}
                    />
                    <CardContent>
                      <Typography
                        variant="h3"
                        fontWeight={"bold"}
                        sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                      >
                        {product.name}
                      </Typography>
                      <Typography mt={1} variant="h4" fontWeight={"600"}>
                        Rp {convertPriceWithCommas(product.price)}
                      </Typography>
                      <Typography variant="h5" mt={1} fontWeight={"600"}>
                        Stock: {product.quantity}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            ))}
          </Box>
        </Paper>
      </Box>
    </>
  )
}

export default CardProductHome
