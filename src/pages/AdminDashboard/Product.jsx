import { useEffect, useState } from "react"
import { axiosInstance } from "../../configs/api/api"
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material"
import { columns } from "../../configs/constant/productColumns"
import ConfirmDialogDelete from "../../components/admin/ConfirmDialogDelete"
import CreateProductModal from "../../components/admin/CreateProductModal"
import DetailProductModal from "../../components/admin/DetailProductModal"

const ProductsPage = () => {
  const [product, setProduct] = useState([])
  const [page, setPage] = useState(0)
  const [productId, setProductId] = useState("")
  const [productDetailId, setProductDetailId] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  // const [openDialogEdit, setOpenDialogEdit] = useState(false)
  const [openProductModal, setOpenProductModal] = useState(false)
  const [openDetailProduct, setOpenDetailProduct] = useState(false)

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

  const handleEdit = () => {}
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

  useEffect(() => {
    getAllProductData()
  }, [])

  return (
    <>
      <Paper sx={{ width: "80vw", height: "85vh", overflow: "hidden" }}>
        <Button
          sx={{ color: "black", bgcolor: "blueviolet" }}
          variant="contained"
          onClick={() => handleOpenModal()}
        >
          Add Product
        </Button>
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
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
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
                    <TableCell align="left">
                      <Box display={"flex"} gap={2}>
                        <Button variant="contained" onClick={() => handleEdit(row.id)}>
                          Edit
                        </Button>{" "}
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleOpenDialogDelete(row.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell align="left"></TableCell>
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
