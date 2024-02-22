import { useParams } from "react-router-dom"
import { axiosInstance } from "../../configs/api/api"
import { useEffect, useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import Carousel from "react-material-ui-carousel"
import { BASE_URL } from "../../configs/constant/baseUrl"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"

const ProductDetail = () => {
  const [product, setProduct] = useState([])
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [total, setTotal] = useState(0)

  const params = useParams()

  const handleAddQty = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity)
    }
    setQuantity(Number(quantity + 1))
  }

  const handleReduceQty = () => {
    setQuantity(quantity - 1)

    if (quantity === 1) {
      setQuantity(1)
    }
  }

  const getProductDetail = async () => {
    try {
      const response = await axiosInstance.get(`product/${Number(params.id)}`)

      setProduct(response.data.data)
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
    if (product) {
      setPrice(convertPriceWithCommas(product.price)) // Format price if product epriceists
    }
  }, [product])

  useEffect(() => {
    setTotal(convertPriceWithCommas(product.price * quantity))
  }, [quantity])

  useEffect(() => {
    getProductDetail()
  }, [])

  return (
    <>
      <Box
        display={"grid"}
        height={"80vh"}
        sx={{ gridTemplateRows: "auto", gridTemplateColumns: "1fr 1fr " }}
        px={20}
        gap={5}
      >
        <Box position={"sticky"}>
          <Carousel>
            {product.productImages?.map((item, i) => (
              <Box
                key={i}
                component={"img"}
                sx={{ height: "500px", width: "100%", objectFit: "cover" }}
                src={BASE_URL + item.imageUrl}
              />
            ))}
          </Carousel>
        </Box>
        <Box mx={2}>
          <Typography variant="h2" fontWeight={"bold"}>
            {product.name}
          </Typography>
          <Typography sx={{ mt: "15px" }} variant="h2" fontWeight={"bold"}>
            Rp {price}
          </Typography>
          <Box height={200} display={"flex"} mt={10} flexDirection={"column"}>
            <Box height={100} width={"50%"} position={"relative"} sx={{ left: "25%" }}>
              <Box
                position={"relative"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box display={"flex"}>
                  <Button startIcon={<RemoveIcon />} color="secondary" onClick={handleReduceQty} />
                  <TextField
                    sx={{
                      textAlign: "center",
                      "& input": {
                        textAlign: "center",
                        "&::-webkit-inner-spin-button": {
                          appearance: "none"
                        },
                        "&::-webkit-outer-spin-button": {
                          appearance: "none"
                        },
                        "-moz-appearance": "textfield"
                      }
                    }}
                    defaultValue={quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                  />
                  <Button startIcon={<AddIcon />} color="secondary" onClick={handleAddQty} />
                </Box>
                <Box display={"flex"}>
                  <Typography mr={2} variant="h5">
                    Stock:
                  </Typography>
                  <Typography variant="h5" fontWeight={"bold"}>
                    {product.quantity}
                  </Typography>
                </Box>
              </Box>
              <Box display={"flex"} mt={4} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="h5" fontWeight={500}>
                  Subtotal
                </Typography>
                <Typography variant="h4" fontWeight={"bold"}>
                  {total}
                </Typography>
              </Box>
              <Button sx={{ width: "100%", bgcolor: "green", mt: "30px" }}>Add to Cart</Button>
            </Box>
            <Box height={100} width={"100%"}></Box>
          </Box>
          <Typography
            textAlign={"center"}
            sx={{ mt: "20px", borderBottom: "1px solid" }}
            variant="h5"
            fontWeight={600}
          >
            Detail
          </Typography>
          <Typography sx={{ mt: "20px" }} variant="h5" fontWeight={"bold"}>
            {product.description}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default ProductDetail
