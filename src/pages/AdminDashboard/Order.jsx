import {
  Box,
  Button,
  Modal,
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
import { VisibilityOffOutlined } from "@mui/icons-material"

const tokenAdmin =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInJvbGVJZCI6MTMsImlhdCI6MTcwODMzNDMwNSwiZXhwIjoxNzEwOTI2MzA1fQ.G505TR_v9a7NoKRy9rYVpBA8T4KEUylFci3PmrngZC4"

const OrderPage = () => {
  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [open, setOpen] = useState(false)
  const [orderDetail, setOrderDetail] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingDetail, setLoadingDetail] = useState(false)

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
    } catch (err) {
      setLoading(false)
    }
    setLoading(false)
  }

  const getOrderDetailById = async (orderId) => {
    setLoadingDetail(true)
    try {
      const response = await axiosInstance.get(`orders/admin/${Number(orderId)}`, {
        headers: {
          Authorization: `Bearer ${tokenAdmin}`,
          "Content-Type": "application/json"
        }
      })
      setOrderDetail(response.data.order)
      setLoadingDetail(false)
    } catch (err) {
      setLoadingDetail(false)
    }
  }

  const handleChangePage = (newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const openModal = async (orderId) => {
    setOpen(true)
    await getOrderDetailById(orderId)
  }

  const columns = [
    { id: "orderId", label: "Order ID", minWidth: 60, align: "left" },
    { id: "invoice", label: "No. Invoice", minWidth: 60, align: "left" },
    { id: "date", label: "Order Date", minWidth: 120, align: "left" },
    { id: "userId", label: "User ID", minWidth: 120, align: "left" },
    { id: "destination", label: "Destination ID", minWidth: 120, align: "left" },
    { id: "totalOrder", label: "Total Order", minWidth: 120, align: "left" },
    { id: "totalOngkir", label: "Total Ongkir", minWidth: 120, align: "left" },
    { id: "grandTotal", label: "Grand Total", minWidth: 120, align: "left" },
    { id: "status", label: "Order Status", minWidth: 120, align: "left" },
    { id: "action", label: "Action", minWidth: 120, align: "left" }
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
                {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => {
                  return (
                    <TableRow hover key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.invoice}</TableCell>
                      <TableCell>
                        {Intl.DateTimeFormat("id-ID").format(new Date(order.date))}
                      </TableCell>
                      <TableCell>{order.userId}</TableCell>
                      <TableCell>{order.destination}</TableCell>
                      <TableCell>
                        {Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
                          order.totalOrder * 16000
                        )}
                      </TableCell>
                      <TableCell>
                        {Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
                          order.totalOngkir
                        )}
                      </TableCell>
                      <TableCell>
                        {Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
                          order.grandTotal
                        )}
                      </TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => openModal(order.id)}
                        >
                          <VisibilityOffOutlined />
                          Detail
                        </Button>
                      </TableCell>
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

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 2,
            minWidth: 600,
            minHeight: 300,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px"
          }}
        >
          <Typography variant="h4" color="primary">
            Order Details
          </Typography>
          {loadingDetail ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2
                }}
              >
                <Box color="primary">
                  <Typography variant="h5">Order Information</Typography>
                  <Typography>Order ID: {orderDetail.id} </Typography>
                  <Typography>Invoice Number: {orderDetail.id} </Typography>
                  <Typography>Order Date: {orderDetail.date} </Typography>
                  <Typography>Destination ID: {orderDetail.destination} </Typography>
                  <Typography>Order Status: {orderDetail.status} </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">User Details</Typography>
                  <Typography>{orderDetail.userId}</Typography>
                </Box>
              </Box>
              <Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>Product ID</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderDetail.orderItem.map((item, index) => {
                        return (
                          <TableRow key={item.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.productId}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.total}</TableCell>
                          </TableRow>
                        )
                      })}
                      <TableRow>
                        <TableCell colSpan={2}></TableCell>
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell>{orderDetail.totalOrder}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}></TableCell>
                        <TableCell colSpan={2}>Ongkir</TableCell>
                        <TableCell>{orderDetail.totalOngkir}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}></TableCell>
                        <TableCell colSpan={2}>Grand Total</TableCell>
                        <TableCell>{orderDetail.grandTotal}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  )
}

export default OrderPage
