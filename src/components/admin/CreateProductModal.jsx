import { Box, Button, IconButton, Input, Modal, TextField, Typography } from "@mui/material"
import { axiosInstance } from "../../configs/api/api"
import { useEffect, useRef, useState } from "react"
import SelectCategory from "./SelectCategory"
import UploadIcon from "@mui/icons-material/Upload"
import ClearIcon from "@mui/icons-material/Clear"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const CreateProductModal = ({ open, close, reRender }) => {
  const [category, setCategory] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    categoryId: "",
    images: []
  })

  const inputFileRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formDataToSend = new FormData()

      formDataToSend.append("name", formData.name)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("price", formData.price)
      formDataToSend.append("quantity", formData.quantity)
      formDataToSend.append("categoryId", formData.categoryId)

      formData.images.forEach((file) => {
        formDataToSend.append("imageUrl", file)
      })

      await axiosInstance.post("product/", formDataToSend)
      close()
      toast.success("Success create new product!", {
        position: "bottom-center"
      })
      reRender()
      setFormData({
        name: "",
        description: "",
        quantity: "",
        price: "",
        categoryId: "",
        images: []
      })
    } catch (err) {
      console.log(err)
      if (err.response.data.message === "File too large, maximum allowed is 1 mb") {
        toast.warn("File too large! Maximum allowed is 1mb", {
          position: "bottom-center"
        })
      }

      if (err.response.data.message === "Too many files uploaded. Maximum allowed is 6") {
        toast.warn("Too many files uploaded. Maximum allowed is 6", {
          position: "bottom-center"
        })
      }
    }
  }

  const getCategory = async () => {
    const response = await axiosInstance.get("categories")
    setCategory(response.data.data)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prevFromData) => ({
      ...prevFromData,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)

    setFormData((prevFormData) => ({
      ...prevFormData,
      images: files
    }))
  }

  const handleCategoryChange = (categoryId) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      categoryId: categoryId
    }))
  }

  useEffect(() => {
    getCategory()
  }, [])
  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
            height: "50vh"
          }}
          overflow={"auto"}
          position="relative"
        >
          <Box mx={3}>
            <Box mt={3} mb={3}>
              <Typography variant="h1">Create Product</Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <Box display={"flex"} flexDirection={"column"} margin={"auto"} mt={7}>
                <TextField
                  id="name"
                  name="name"
                  label="Product Name"
                  sx={{ width: "100%", marginBottom: "20px" }}
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  id="description"
                  name="description"
                  required
                  label="Description"
                  sx={{ width: "100%", marginBottom: "20px" }}
                  value={formData.description}
                  onChange={handleChange}
                />

                <TextField
                  id="quantity"
                  required
                  name="quantity"
                  label="Quantity"
                  sx={{ width: "100%", marginBottom: "20px" }}
                  value={formData.quantity}
                  onChange={handleChange}
                  type="number"
                />

                <TextField
                  id="price"
                  required
                  name="price"
                  label="Price"
                  sx={{ width: "100%", marginBottom: "20px" }}
                  value={formData.price}
                  onChange={handleChange}
                  type="number"
                />

                <SelectCategory
                  category={category}
                  categoryData={formData.categoryId}
                  handleCategory={handleCategoryChange}
                />
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection={"row"}
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
                      border: "none"
                    }}
                  >
                    Upload file
                    <Input
                      type="file"
                      inputProps={{ multiple: true }}
                      sx={{ display: "none" }}
                      onChange={handleFileChange}
                      ref={inputFileRef}
                      required
                    />
                  </Button>
                  <Button sx={{ width: "30%" }} color="success" variant="contained" type="submit">
                    Submit
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "20px",
                    marginTop: "20px"
                  }}
                >
                  {Array.from(
                    formData.images.map((image, i) => (
                      <Box key={i} position={"relative"} mb={"10px"}>
                        <Box
                          component="img"
                          sx={{ height: "300px", width: "400px" }}
                          src={URL.createObjectURL(image)}
                        />
                        <IconButton
                          sx={{ position: "absolute", top: "0", right: "0", color: "red" }}
                          onClick={() => {
                            const updatedImages = [...formData.images]
                            updatedImages.splice(i, 1)
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              images: updatedImages
                            }))
                          }}
                        >
                          <ClearIcon />
                        </IconButton>
                      </Box>
                    ))
                  )}
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default CreateProductModal
