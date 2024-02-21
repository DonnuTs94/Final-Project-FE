import { Box, IconButton, Modal, Typography } from "@mui/material"
import { axiosInstance } from "../../configs/api/api"
import { useCallback, useEffect, useState } from "react"
import Carousel from "react-material-ui-carousel"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import { BASE_URL } from "../../configs/constant/baseUrl"
import ClearIcon from "@mui/icons-material/Clear"

const DetailProductModal = ({ open, close, productId }) => {
  const [product, setProduct] = useState([])
  const [mode, setMode] = useState("regular")

  const getProductDetail = async () => {
    try {
      const response = await axiosInstance.get(`product/${productId}`)
      setProduct(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const toggleVariant = useCallback(() => {
    setMode((currentMode) => (currentMode === "regular" ? "edit" : "regular"))
  }, [])

  console.log(product)

  useEffect(() => {
    getProductDetail()
  }, [productId])

  return (
    <>
      <Modal open={open} onClose={close}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          sx={{
            position: "absolute",
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            borderRadius: "5px",
            minHeight: 200,
            height: 800,
            overflow: "scroll"
          }}
          position="relative"
        >
          <Box>
            <Box width={"90%"} sx={{ margin: "auto", marginTop: "20px" }}>
              {mode === "regular" && (
                <Carousel>
                  {product.productImages?.map((image, i) => (
                    <Box
                      component={"img"}
                      key={i}
                      sx={{ height: "400px", width: "100%" }}
                      src={BASE_URL + image.imageUrl}
                      alt={`Image ${i}`}
                      onError={() => console.log(`Error loading image ${i}`)} // Log a simple error message
                    />
                  ))}
                </Carousel>
              )}
            </Box>
            <Box mx={5} mt={2}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant="h1" fontWeight="bold" sx={{ textTransform: "uppercase" }}>
                  {product?.name}
                </Typography>
                <IconButton onClick={() => toggleVariant()}>
                  <ModeEditIcon />
                </IconButton>
              </Box>
              <Typography variant="h4" fontWeight="bold" mt={1} sx={{ textTransform: "uppercase" }}>
                Price: ${product?.price}
              </Typography>
              <Typography variant="h4" fontWeight="bold" mt={1}>
                Quantity: {product?.quantity} unit
              </Typography>
              <Typography variant="body1" mt={2}>
                <strong>Description:</strong> {product?.description}
              </Typography>
              <Typography variant="body1">
                <strong>Category:</strong> {product.Category?.name}
              </Typography>
            </Box>
            <Box mx={5} mt={5}>
              {mode === "edit" && (
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                  {product.productImages.map((item, i) => (
                    <Box key={i} position={"relative"}>
                      <Box
                        component={"img"}
                        src={BASE_URL + item.imageUrl}
                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <IconButton sx={{ right: 0, position: "absolute", top: 0, color: "red" }}>
                        <ClearIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default DetailProductModal
