import { Box, Button, IconButton, Input, Modal, TextField, Typography } from "@mui/material"
import { axiosInstance } from "../../configs/api/api"
import { useEffect, useRef, useState } from "react"
import SelectCategory from "./SelectCategory"
import UploadIcon from "@mui/icons-material/Upload"
import ClearIcon from "@mui/icons-material/Clear"

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
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "background.paper",
            // border: "1spx solid #000",
            display: "flex",
            flexDirection: "column",
            borderRadius: "5px",
            minHeight: 200
          }}
          position="relative"
        >
          <Box ml={2}>
            <Box mt={3} mb={3}>
              <Typography variant="h1">Create Product</Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <Typography variant="h3" marginBottom={1}>
                Product Name
              </Typography>
              <TextField
                id="name"
                name="name"
                label="Product Name"
                sx={{ width: "95%", marginBottom: "20px" }}
                value={formData.name}
                onChange={handleChange}
              />
              <Typography variant="h3">Description</Typography>
              <TextField
                id="description"
                name="description"
                label="Description"
                sx={{ width: "95%", marginBottom: "20px" }}
                value={formData.description}
                onChange={handleChange}
              />

              <Typography variant="h3">Quantity</Typography>
              <TextField
                id="quantity"
                name="quantity"
                label="Quantity"
                sx={{ width: "95%", marginBottom: "20px" }}
                value={formData.quantity}
                onChange={handleChange}
              />

              <Typography variant="h3">Price</Typography>
              <TextField
                id="price"
                name="price"
                label="Price"
                sx={{ width: "95%", marginBottom: "20px" }}
                value={formData.price}
                onChange={handleChange}
              />
              <Typography variant="h3" sx={{ marginBottom: "20px" }}>
                Category
              </Typography>

              <SelectCategory
                category={category}
                categoryData={formData.categoryId}
                handleCategory={handleCategoryChange}
              />
              <Input
                type="file"
                inputProps={{ multiple: true }}
                // sx={{ display: "none" }}
                onChange={handleFileChange}
                ref={inputFileRef}
                required
              />
              <Box display="flex" gap={2} alignItems="center">
                <IconButton
                  component="span"
                  sx={{ height: "50px" }}
                  onClick={() => inputFileRef.current.click()}
                >
                  <UploadIcon sx={{ color: "skyblue" }} />
                  <Typography color="black">Upload your file</Typography>
                </IconButton>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                {Array.from(
                  formData.images.map((image, i) => (
                    <Box key={i} position={"relative"}>
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
              <Button
                sx={{ marginBottom: "20px", bgcolor: "skyblue" }}
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default CreateProductModal
