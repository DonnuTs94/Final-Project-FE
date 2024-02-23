import { useEffect, useState } from "react"
import { axiosInstance } from "../../configs/api/api"
import {
  Box,
  Button,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material"
import { columns } from "../../configs/constant/productColumns"
import ConfirmDialogDelete from "../../components/admin/ConfirmDialogDelete"
import CreateProductModal from "../../components/admin/CreateProductModal"
import DetailProductModal from "../../components/admin/DetailProductModal"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import ClearIcon from "@mui/icons-material/Clear"
import DoneIcon from "@mui/icons-material/Done"
import { toast } from "react-toastify"

const ProductsPage = () => {
  const [product, setProduct] = useState([])
  const [page, setPage] = useState(0)
  const [productId, setProductId] = useState("")
  const [productDetailId, setProductDetailId] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [openProductModal, setOpenProductModal] = useState(false)
  const [openDetailProduct, setOpenDetailProduct] = useState(false)
  const [editingProductId, setEditingProductId] = useState(false)
  const [editProduct, setEditProduct] = useState(null)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleOpenModal = () => {
    setOpenProductModal(true)
  }

  const handleCloseModal = () => {
    setOpenProductModal(false)
  }

  const handleOpenProductDetail = (id) => {
    setOpenDetailProduct(true)
    setProductDetailId(id)
  }

  const handleCloseProductDetail = () => {
    setOpenDetailProduct(false)
  }

  const handleOpenDialogDelete = (id) => {
    setOpenDialogDelete(true)
    setProductId(id)
  }
  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleDelete = async () => {
    await axiosInstance.delete(`/product/softDelete/${productId}`)
    getAllProductData()
  }

  const getAllProductData = async () => {
    try {
      const response = await axiosInstance.get("/product/table")
      setProduct(response.data.data)
    } catch (error) {
      console.error("Error fetching product data:", error)
    }
  }

  const handleOnEditMode = (id) => {
    const editedProduct = product.find((item) => item.id === id)
    setEditingProductId(id)
    setEditProduct(editedProduct)
  }

  const handleEdit = async () => {
    try {
      const priceNumber = Number(editProduct.price)
      const qtrNumber = Number(editProduct.quantity)

      if (priceNumber < 1) {
        toast.warn("Price minimum is 1", {
          position: "bottom-center"
        })
        throw new Error("Price minimum is 1")
      }

      if (qtrNumber < 0) {
        toast.warn("Quantity minimum is 0", {
          position: "bottom-center"
        })
        throw new Error("Quantity minimum is 0")
      }
      await axiosInstance.put(`/product/${editingProductId}`, {
        quantity: qtrNumber,
        price: priceNumber
      })
      setEditingProductId(false)
      getAllProductData()
      toast.success("Success edit product", {
        position: "bottom-center"
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handlePriceChange = (e) => {
    const { value } = e.target
    setEditProduct((prevProduct) => ({ ...prevProduct, price: value }))
  }

  const handleQuantityChange = (e) => {
    const { value } = e.target
    setEditProduct((prevProduct) => ({ ...prevProduct, quantity: value }))
  }

  useEffect(() => {
    getAllProductData()
  }, [])

  return (
    <>
      <Paper sx={{ width: "80vw", height: "100vh", overflow: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px"
          }}
        >
          <Typography variant="h2">Product</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            color="primary"
            onClick={() => handleOpenModal()}
          >
            Add Product
          </Button>
        </Box>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((item) => (
                  <TableCell key={item.id} align={item.align} style={{ minWidth: item.minWidth }}>
                    {item.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {product
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell
                      onClick={() => handleOpenProductDetail(row.id)}
                      sx={{ cursor: "pointer" }}
                    >
                      {row.name}
                    </TableCell>
                    {editingProductId === row.id ? (
                      <>
                        <TableCell>
                          <Input
                            type="number"
                            value={editProduct.price}
                            onChange={(e) => handlePriceChange(e, row.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={editProduct.quantity}
                            onChange={(e) => handleQuantityChange(e, row.id)}
                          />
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                      </>
                    )}
                    <TableCell
                      sx={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {row.description}
                    </TableCell>
                    <TableCell>{row.Category?.name}</TableCell>
                    <TableCell>
                      <Box display={"flex"} gap={2}>
                        {editingProductId === row.id ? (
                          <>
                            <Button onClick={handleEdit} color="warning">
                              <DoneIcon />
                            </Button>
                            <Button onClick={() => setEditingProductId(false)} color="warning">
                              <ClearIcon />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              color="warning"
                              size="large"
                              onClick={() => handleOnEditMode(row.id)}
                              style={{ marginRight: "8px" }}
                              startIcon={<EditIcon />}
                            >
                              Edit
                            </Button>
                            <Button
                              color="error"
                              size="large"
                              onClick={() => handleOpenDialogDelete(row.id)}
                              startIcon={<DeleteIcon />}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[10, 20, 40]}
          rowsPerPage={rowsPerPage}
          count={product.length}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <ConfirmDialogDelete
        open={openDialogDelete}
        close={handleCloseDialogDelete}
        handleDelete={handleDelete}
        productId={productId}
        dialog={"Are you sure want to delete this product?"}
      />

      <CreateProductModal
        open={openProductModal}
        close={handleCloseModal}
        reRender={getAllProductData}
      />

      <DetailProductModal
        open={openDetailProduct}
        close={handleCloseProductDetail}
        productId={productDetailId}
      />
    </>
  )
}

export default ProductsPage
