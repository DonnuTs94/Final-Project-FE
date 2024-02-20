import { useEffect, useState } from "react"
import { axiosInstance } from "../../configs/api/api"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material"

const ProductsPage = () => {
  const [product, setProduct] = useState([])
  const [currentPage, setCurrentPage] = useState([])

  const getAllProductData = async () => {
    const response = await axiosInstance.get("/product")
    setProduct(response.data.data)
    setCurrentPage(response.data)
  }

  console.log(currentPage)

  useEffect(() => {
    getAllProductData()
  }, [])

  const columns = [
    { id: "name", label: "Product", minWidth: 170, align: "left" },
    { id: "price", label: "Price", minWidth: 170, align: "left" },
    {
      id: "quantity",
      label: "Quantity",
      minWidth: 170,
      align: "left"
    },
    {
      id: "description",
      label: "Description",
      minWidth: 170,
      align: "left"
    },
    {
      id: "category",
      label: "Category",
      minWidth: 170,
      align: "left"
    }
  ]

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
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
              {product.map((row) => {
                return (
                  <TableRow hover key={row.code}>
                    {/* {product.map((item) => {
                      const value = row[item.id]
                      return (
                        <TableCell key={item.id}>
                          {item.format && typeof value === "number" ? item.format(value) : value}
                        </TableCell>
                      )
                    })} */}
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.categoryId}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination component="div" page={currentPage} rowsPerPage={false} />
      </Paper>
    </>
  )
}

export default ProductsPage
