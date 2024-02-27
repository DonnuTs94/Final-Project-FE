import { Box, Card, CardActionArea, CardContent, CardMedia, Paper, Typography } from "@mui/material"
import { useEffect } from "react"
import { BASE_URL } from "../configs/constant/baseUrl"
import { Link } from "react-router-dom"
import { convertPriceWithCommas } from "../helper/formatter"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductData } from "../configs/store/slicer/productSlicer"

const CardProductHome = () => {
  const dispatch = useDispatch()

  const products = useSelector((state) => state.product.productData) || []

  const params = {
    category: 6
  }

  useEffect(() => {
    dispatch(fetchProductData(params))
  }, [])

  return (
    <>
      <Box mt={{ xs: 2 }}>
        <Paper elevation={6}>
          <Box pt={2} mr={2} display={"flex"} gap={3} alignItems={"center"} ml={2}>
            <Typography variant="h2">Newest Product</Typography>
          </Box>
          <Box
            display={"grid"}
            gridTemplateColumns={"1fr"}
            gap={2}
            p={2}
            sx={{
              height: "10%",
              overflowX: "auto",
              "@media (min-width: 200px)": {
                gridTemplateColumns: "repeat(5, minmax(50%, 1fr))"
              },
              "@media (min-width: 1080px)": {
                gridTemplateColumns: "repeat(5, minmax(20%, 1fr))"
              },
              "@media (min-width: 1280px)": {
                gridTemplateColumns: "repeat(5, minmax(20%, 1fr))",
                maxWidth: "1440px",
                margin: "0 auto"
              }
            }}
          >
            {products.slice(0, 5).map((product, i) => (
              <Card key={i} sx={{ minWidth: "150px", maxWidth: "100%" }}>
                <Link to={`product/${product.id}`}>
                  <CardActionArea>
                    <CardMedia
                      sx={{ height: "200px", maxWidth: "100%", objectFit: "contain" }}
                      component={"img"}
                      src={BASE_URL + product?.productImages[0]?.imageUrl}
                    />
                    <CardContent>
                      <Typography
                        variant="h3"
                        fontWeight={600}
                        sx={{
                          overflow: "hidden"
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography mt={1} variant="h4" fontWeight={"600"}>
                        Rp {convertPriceWithCommas(product.price)}
                      </Typography>
                      <Typography variant="h5" mt={1} fontWeight={"600"}>
                        Stock: {product.quantity}
                      </Typography>{" "}
                      <Typography variant="h5" mt={1} fontWeight={"600"}>
                        {product.Category.name}
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
