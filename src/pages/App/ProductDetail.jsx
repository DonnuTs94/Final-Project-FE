import { useParams } from "react-router-dom"
import { axiosInstance } from "../../configs/api/api"
import { useEffect, useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import Carousel from "react-material-ui-carousel"
import { BASE_URL } from "../../configs/constant/baseUrl"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
import { ToastContainer, toast } from "react-toastify"

const ProductDetail = () => {
  const [product, setProduct] = useState([])
  const [price, setPrice] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [total, setTotal] = useState(0)

  const params = useParams()

  const handleAddQty = () => {
    const maxQuantity = product.quantity
    const newQuantity = quantity + 1

    if (newQuantity <= maxQuantity) {
      setQuantity(newQuantity)
    } else {
      setQuantity(maxQuantity)
    }
  }

  const handleReduceQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
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
      console.log(err)
      if (err.response.data.message === "Unauthorized") {
        toast.warn("You have to sign in to add product to your cart", {
          position: "bottom-center"
        })
      }

      if (err.response.data.message === "Product stock is not available") {
        toast.warn("Product stock is not available", {
          position: "bottom-center"
        })
      }

      if (err.response.data.message === "Failed Create Cart") {
        toast.error("Failed Create Cart", {
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
      if (err.status === 500) {
        toast.error("Something when wrong", {
          position: "bottom-center"
        })
      }
    }
  }

  const convertPriceWithCommas = (price) => {
    if (typeof price === "number" && !isNaN(price)) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    return ""
  }

  const renderNotFound = () => (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        component="img"
        src="/ProductNotFound.jpg"
        alt="Product Not Found"
        sx={{
          objectFit: "cover",
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto"
        }}
      />
    </Box>
  )

  useEffect(() => {
    if (product) {
      setPrice(convertPriceWithCommas(product.price))
    }
  }, [product])

  useEffect(() => {
    setTotal(convertPriceWithCommas(product.price * quantity))
  }, [product.price, quantity])

  useEffect(() => {
    getProductDetail()
  }, [product])

  console.log(product)

  return (
    <>
      {!product || product.length === 0 ? (
        renderNotFound()
      ) : (
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
                      <Button
                        startIcon={<RemoveIcon />}
                        color="secondary"
                        onClick={handleReduceQty}
                      />
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
                        onBlur={() => {
                          if (quantity === "") {
                            setQuantity(1)
                          }
                        }}
                        onChange={(e) => {
                          const value = e.target.value
                          if (value === "" || (!isNaN(value) && parseInt(value) >= 0)) {
                            setQuantity(value === "" ? "" : parseInt(value))
                          }
                          if (value > product.quantity) {
                            setQuantity(product.quantity)
                          }
                        }}
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
                  <Box
                    display={"flex"}
                    mt={4}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography variant="h5" fontWeight={500}>
                      Subtotal:
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
      )}
    </>
  )
}

export default ProductDetail
