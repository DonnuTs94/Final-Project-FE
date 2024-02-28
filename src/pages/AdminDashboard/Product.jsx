import { useEffect, useState } from "react"
import { axiosInstance } from "../../configs/api/api"
import {
  Box,
  Button,
  CircularProgress,
  Input,
  InputBase,
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
import { toast, ToastContainer } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { fetchAdminProductData } from "../../configs/store/slicer/adminProductSlicer"
import { useTheme } from "@emotion/react"
import SelectCategory from "../../components/admin/SelectCategory"
import RefreshIcon from "@mui/icons-material/Refresh"
import "react-toastify/dist/ReactToastify.css"
import { convertPriceWithCommas } from "../../helper/formatter"

const ProductsPage = () => {
  const [page, setPage] = useState(0)
  const [productId, setProductId] = useState("")
  const [productDetailId, setProductDetailId] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [openProductModal, setOpenProductModal] = useState(false)
  const [openDetailProduct, setOpenDetailProduct] = useState(false)
  const [editingProductId, setEditingProductId] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [searchName, setSearchName] = useState("")
  const [searchCategory, setSearchCategory] = useState("")
  const [category, setCategory] = useState([])

  const [saveProgress, setSaveProgress] = useState(false)

  const { error, loading } = useSelector((state) => state.adminProduct)

  const productSelector = useSelector((state) => state.adminProduct.productData) || []

  const dispatch = useDispatch()
  const theme = useTheme()

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
    toast.success("Success delete product", {
      position: "bottom-center"
    })
    setSaveProgress(true)
  }

  const handleOnEditMode = (id) => {
    const editedProduct = productSelector.find((item) => item.id === id)
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
      toast.success("Success edit product", {
        position: "bottom-center"
      })
      setSaveProgress(true)
    } catch (err) {
      if (err.response.status === 500) {
        toast.error("Something went wrong", {
          position: "bottom-center"
        })
      }
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

  const getCategoryData = async () => {
    try {
      const response = await axiosInstance.get("categories")
      setCategory(response.data.data)
    } catch (err) {
      if (err.name === "AxiosError") {
        toast.error("Something went wrong", {
          position: "bottom-center"
        })
      }
    }
  }

  const handleClearFilter = () => {
    setSearchName("")
    setSearchCategory("")
  }

  useEffect(() => {
    if (saveProgress) {
      dispatch(fetchAdminProductData())
      setSaveProgress(false)
    }
    dispatch(fetchAdminProductData())
  }, [saveProgress, dispatch])

  useEffect(() => {
    getCategoryData()
  }, [])

  if (error) {
    toast.error(error.message, {
      position: "bottom-center"
    })
  }

  const filteredProducts = productSelector?.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(searchName.toLowerCase())
    const categoryMatch = searchCategory ? product.categoryId === searchCategory : true
    return nameMatch && categoryMatch
  })

  return (
    <>
      <Paper sx={{ width: "100%", height: "95vh", overflow: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px"
          }}
        >
          <Typography variant="h2" mr="20px">
            Product
          </Typography>
          <Box display="flex" gap="10px" alignItems="center" borderRadius={2}>
            <InputBase
              sx={{
                flex: 1,
                paddingY: "2px",
                paddingLeft: "20px",
                fontSize: "14px",
                borderRadius: "5px",
                height: "50px",
                width: "250px",
                bgcolor: "secondary.light",
                color: "primary.dark"
              }}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search"
            />
            <SelectCategory
              category={category}
              categoryData={searchCategory}
              handleCategory={(value) => setSearchCategory(value)}
            />
            <Button startIcon={<RefreshIcon />} onClick={handleClearFilter} />
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            color="primary"
            onClick={() => handleOpenModal()}
          >
            Add
          </Button>
        </Box>
        <TableContainer sx={{ height: "80%" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((item) => (
                  <TableCell
                    key={item.id}
                    align={item.align}
                    style={{
                      minWidth: item.minWidth,
                      fontWeight: "bold",
                      backgroundColor: theme.palette.secondary.main
                    }}
                  >
                    {item.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell align="center" colSpan={columns.length}>
                    <CircularProgress color="info" />
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts
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
                          <TableCell>{convertPriceWithCommas(row.price)}</TableCell>
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
                        <Box display="flex" justifyContent="center" gap={2}>
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
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ position: "sticky", bottom: 0 }}
          component="div"
          rowsPerPageOptions={[10, 20, 40]}
          rowsPerPage={rowsPerPage}
          count={productSelector?.length}
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
        reRender={() => setSaveProgress(true)}
      />

      <DetailProductModal
        open={openDetailProduct}
        close={handleCloseProductDetail}
        productId={productDetailId}
      />
      <ToastContainer />
    </>
  )
}

export default ProductsPage
