import { useParams } from "react-router-dom"
import { axiosInstance } from "../../configs/api/api"
import { useEffect, useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import Carousel from "react-material-ui-carousel"
import { BASE_URL } from "../../configs/constant/baseUrl"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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

  const addToCart = async () => {
    try {
      await axiosInstance.post("/carts/create", {
        quantity: quantity,
        productId: product.id
      })

      toast.success("Success add product to cart!", {
        position: "bottom-center"
      })
    } catch (err) {
      if (err.name === "AxiosError" && err.response.data.message === "Unauthorized") {
        toast.warn("You have to sign in to add product to your cart", {
          position: "bottom-center"
        })
      }
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
        height={"60vh"}
        sx={{
          gridTemplateRows: "auto",
          gridTemplateColumns: { s: "1fr", md: "1fr 1fr", xl: "1fr 1fr" },
          gap: 5,
          mt: 5,
          px: "0",
          mx: 10
        }}
        px={20}
        gap={5}
      >
        <Box position={"sticky"} sx={{ minWidth: 0 }} height={"100%"}>
          <Carousel>
            {product.productImages?.map((item, i) => (
              <>
                <Box
                  width={"100%"}
                  key={i}
                  component={"img"}
                  sx={{ width: "100%", height: "600px", objectFit: "cover" }}
                  src={BASE_URL + item.imageUrl}
                />
              </>
            ))}
          </Carousel>
        </Box>
        <Box mx={2}>
          <Typography variant="h2" fontWeight={"bold"} sx={{ textAlign: { xs: "center" } }}>
            {product.name}
          </Typography>
          <Typography
            sx={{ mt: "15px", textAlign: { xs: "center" } }}
            variant="h2"
            fontWeight={"bold"}
          >
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
                      },
                      width: { xs: "100px", md: "100px", xl: "150px" }
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
              <Button
                sx={{
                  width: "100%",
                  bgcolor: "green",
                  mt: "30px",
                  "&:hover": {
                    bgcolor: "darkgreen"
                  },
                  color: "white"
                }}
                onClick={addToCart}
              >
                Add to Cart
              </Button>
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
      <ToastContainer />
    </>
  )
}

export default ProductDetail
