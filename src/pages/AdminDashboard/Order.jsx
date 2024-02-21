import {
  Box,
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
import { useState, useEffect } from "react"
import { axiosInstance } from "../../configs/api/api"

const tokenAdmin =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInJvbGVJZCI6MTMsImlhdCI6MTcwODMzNDMwNSwiZXhwIjoxNzEwOTI2MzA1fQ.G505TR_v9a7NoKRy9rYVpBA8T4KEUylFci3PmrngZC4"

const OrderPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    getAllOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllOrders = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get("orders/admin", {
        headers: {
          Authorization: `Bearer ${tokenAdmin}`,
          "Content-Type": "application/json"
        }
      })
      setOrders(response.data.data)
      console.log(orders)
    } catch (err) {
      setLoading(false)
    }
    setLoading(false)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const columns = [
    { id: "orderId", label: "Order ID", minWidth: 120, align: "left" },
    { id: "invoice", label: "No. Invoice", minWidth: 120, align: "left" },
    { id: "date", label: "Order Date", minWidth: 120, align: "left" },
    { id: "userId", label: "User ID", minWidth: 120, align: "left" },
    { id: "destination", label: "Destination ID", minWidth: 120, align: "left" },
    { id: "totalOrder", label: "Total Order", minWidth: 120, align: "left" },
    { id: "totalOngkir", label: "Total Ongkir", minWidth: 120, align: "left" },
    { id: "grandTotal", label: "Grand Total", minWidth: 120, align: "left" },
    { id: "status", label: "Order Status", minWidth: 120, align: "left" }
  ]
  return (
    <Box width={"100%"}>
      <Typography marginBottom={5} variant="h3">
        Customer Orders
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Paper sx={{ width: "80vw", height: "85vh", overflow: "hidden" }}>
          <TableContainer sx={{ height: "100%" }}>
            <Table stickyHeader aria-label="a dense table">
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
                {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.invoice}</TableCell>
                      <TableCell>
                        {Intl.DateTimeFormat("id-ID").format(new Date(row.date))}
                      </TableCell>
                      <TableCell>{row.userId}</TableCell>
                      <TableCell>{row.destination}</TableCell>
                      <TableCell>
                        {Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
                          row.totalOrder * 16000
                        )}
                      </TableCell>
                      <TableCell>
                        {Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
                          row.totalOngkir
                        )}
                      </TableCell>
                      <TableCell>
                        {Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
                          row.grandTotal
                        )}
                      </TableCell>
                      <TableCell>{row.status}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ position: "sticky", bottom: 0 }}
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  )
}

export default OrderPage
