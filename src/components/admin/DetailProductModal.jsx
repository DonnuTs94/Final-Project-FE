import { Box, Button, IconButton, Input, Modal, Typography } from "@mui/material"
import { axiosInstance } from "../../configs/api/api"
import { useCallback, useEffect, useState } from "react"
import Carousel from "react-material-ui-carousel"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import { BASE_URL } from "../../configs/constant/baseUrl"
import ClearIcon from "@mui/icons-material/Clear"
import ConfirmDialogDelete from "./ConfirmDialogDelete"
import UploadIcon from "@mui/icons-material/Upload"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const DetailProductModal = ({ open, close, productId }) => {
  const [product, setProduct] = useState([])
  const [mode, setMode] = useState("regular")
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [productIdImg, setProductIdImg] = useState("")
  const [image, setImage] = useState("")

  const getProductDetail = async () => {
    try {
      const response = await axiosInstance.get(`product/${productId}`)
      setProduct(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData()

      if (image) {
        formDataToSend.append("imageUrl", image)
      }

      await axiosInstance.post(`product/${productId}/image`, formDataToSend)
      setImage("")
      getProductDetail()
    } catch (err) {
      console.log(err)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
  }

  const handleOpenDialog = (id) => {
    setProductIdImg(id)
    setOpenDialogDelete(true)
  }

  const handleCloseDialog = () => {
    setOpenDialogDelete(false)
  }

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/product/${productId}/image`, {
        data: {
          imageId: productIdImg
        }
      })
      getProductDetail()
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

  const toggleVariant = useCallback(() => {
    setMode((currentMode) => (currentMode === "regular" ? "edit" : "regular"))
  }, [])

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
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
            minHeight: 200,
            height: 800,
            overflow: "auto"
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
                    />
                  ))}
                </Carousel>
              )}
            </Box>
            <Box mx={5} mt={2} textAlign={"center"} display={"flex"} flexDirection={"column"}>
              <Typography variant="h1" fontWeight="bold" sx={{ textTransform: "uppercase" }}>
                {product?.name}
              </Typography>

              <Typography variant="h4" fontWeight="bold" mt={2} sx={{ textTransform: "uppercase" }}>
                Price: {convertPriceWithCommas(product?.price)}
              </Typography>
              <Typography variant="h4" fontWeight="bold" mt={1}>
                Quantity: {product?.quantity} unit
              </Typography>
              <Typography variant="h4" mt={2}>
                <strong>Category:</strong> {product.Category?.name}
              </Typography>
              <Typography variant="body1" mt={2}>
                <strong>Description:</strong> {product?.description}
              </Typography>
              {mode === "regular" ? (
                <IconButton
                  onClick={() => toggleVariant()}
                  variant="outlined"
                  sx={{
                    width: "50%",
                    mt: "20px",
                    color: "black",
                    border: "none",
                    alignSelf: "center"
                  }}
                >
                  <ModeEditIcon /> <Typography sx={{ ml: "5px" }}>Edit</Typography>
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => toggleVariant()}
                  variant="outlined"
                  sx={{
                    width: "50%",
                    mt: "20px",
                    color: "black",
                    border: "none",
                    alignSelf: "center"
                  }}
                >
                  <ArrowBackIcon /> <Typography sx={{ ml: "5px" }}>Back</Typography>
                </IconButton>
              )}
              {mode === "edit" && (
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection={"column"}
                  justifyContent={"center"}
                  height={"100%"}
                  mt={"20px"}
                  gap={2}
                >
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<UploadIcon />}
                    type="file"
                    sx={{
                      color: "black",
                      border: "none",
                      width: "50%"
                    }}
                  >
                    Upload file
                    <Input
                      type="file"
                      inputProps={{ multiple: false }}
                      sx={{ display: "none" }}
                      onChange={handleFileChange}
                      required
                    />
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    sx={{
                      width: "50%"
                    }}
                    color="primary"
                    variant="contained"
                    disabled={!image}
                  >
                    Submit
                  </Button>
                </Box>
              )}
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
                      <IconButton
                        sx={{ right: 0, position: "absolute", top: 0, color: "red" }}
                        onClick={() => handleOpenDialog(item.id)}
                      >
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

      <ConfirmDialogDelete
        open={openDialogDelete}
        close={handleCloseDialog}
        handleDelete={handleDelete}
        productId={productIdImg}
        dialog={"Are you sure want to delete this image?"}
      />
    </>
  )
}

export default DetailProductModal
