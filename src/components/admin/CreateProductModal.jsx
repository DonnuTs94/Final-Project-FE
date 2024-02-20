import { Box, Button, Input, Modal, TextField, Typography } from "@mui/material"
import { axiosInstance } from "../../configs/api/api"
import { useEffect, useState } from "react"
import SelectCategory from "./SelectCategory"

const CreateProductModal = ({ open, close }) => {
  const [category, setCategory] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    categoryId: "",
    images: []
  })

  const getCategory = async () => {
    const response = await axiosInstance.get("categories")
    setCategory(response.data.data)
  }
  console.log(category)

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
            <Typography variant="h3" marginBottom={1}>
              Product Name
            </Typography>
            <TextField
              id="name"
              name="name"
              label="Product Name"
              sx={{ width: "90%", marginBottom: "20px" }}
            />
            <Typography variant="h3">Description</Typography>
            <TextField
              id="name"
              name="name"
              label="Product Name"
              sx={{ width: "90%", marginBottom: "20px" }}
            />

            <Typography variant="h3">Quantity</Typography>
            <TextField
              id="name"
              name="name"
              label="Product Name"
              sx={{ width: "90%", marginBottom: "20px" }}
            />

            <Typography variant="h3">Price</Typography>
            <TextField
              id="name"
              name="name"
              label="Product Name"
              sx={{ width: "90%", marginBottom: "20px" }}
            />

            <SelectCategory category={category} />
            <Input type="file" inputProps={{ multiple: true }} sx={{ marginTop: "20px" }} />
            <Button sx={{ marginBottom: "20px" }}>Submit</Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default CreateProductModal
