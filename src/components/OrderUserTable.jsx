import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material"
import { VisibilityOutlined } from "@mui/icons-material"
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined"
import { useSelector } from "react-redux"
import { currFormatter } from "../helper/formatter"
import { useState } from "react"

const OrderUserTable = ({ status }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [open, setOpen] = useState(false)
  const [orderDetail, setOrderDetail] = useState([])
  const [loadingDetail, setLoadingDetail] = useState(false)
  const { userData, loading } = useSelector((state) => state.users)

  const columns = [
    { id: "orderId", label: "Order ID", minWidth: 60, align: "left" },
    { id: "invoice", label: "No. Invoice", minWidth: 60, align: "left" },
    { id: "date", label: "Order Date", minWidth: 120, align: "left" },
    { id: "destination", label: "Destination ID", minWidth: 120, align: "left" },
    { id: "totalOrder", label: "Total Order", minWidth: 120, align: "left" },
    { id: "totalOngkir", label: "Total Ongkir", minWidth: 120, align: "left" },
    { id: "grandTotal", label: "Grand Total", minWidth: 120, align: "left" },
    { id: "status", label: "Order Status", minWidth: 120, align: "left" },
    { id: "action", label: "Action", minWidth: 120, align: "left" }
  ]
  const allOrders = userData.orders
  const filteredOrder =
    status === "ALL" ? allOrders : allOrders.filter((order) => order.status === status)
  const handleChangePage = (newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const openModal = (orderId) => {
    setOpen(true)
    const orderDetailById = allOrders.filter((order) => order.id === orderId)
    setOrderDetail(orderDetailById[0])
    setLoadingDetail(false)
  }

  return (
    <>
      <TableContainer>
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
                    backgroundColor: "secondary.main"
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
              filteredOrder
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => {
                  return (
                    <TableRow hover key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.invoice}</TableCell>
                      <TableCell>
                        {Intl.DateTimeFormat("id-ID").format(new Date(order.date))}
                      </TableCell>
                      <TableCell>{order.destination}</TableCell>
                      <TableCell>{currFormatter(order.totalOrder)}</TableCell>
                      <TableCell>{currFormatter(order.totalOngkir)}</TableCell>
                      <TableCell>{currFormatter(order.totalOrder + order.totalOngkir)}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          title="Detail Order"
                          onClick={() => openModal(order.id)}
                        >
                          <VisibilityOutlined />
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          title="Terima Barang"
                          //   onClick={}
                        >
                          <CheckCircleOutlineOutlinedIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ position: "sticky", bottom: 0 }}
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        component="div"
        count={filteredOrder.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
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
          <Typography variant="h3" marginBottom={3}>
            Order Details
          </Typography>
          {loadingDetail ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                marginBottom={2}
              >
                <Typography variant="h5">Order Information</Typography>
                <Typography variant="h5">User Details</Typography>
              </Box>
              <Box display="flex" gap={4} paddingX={3}>
                <Box color="primary">
                  <Typography>Order ID: {orderDetail.id} </Typography>
                  <Typography>Invoice Number: {orderDetail.id} </Typography>
                  <Typography>Order Date: {orderDetail.date} </Typography>
                  <Typography>Destination ID: {orderDetail.destination} </Typography>
                  <Typography>Order Status: {orderDetail.status} </Typography>
                </Box>
                <Box>
                  <Typography>User ID: {orderDetail.userId}</Typography>
                  <Typography>First Name: {orderDetail.User?.firstName}</Typography>
                  <Typography>Last Name: {orderDetail.User?.lastName}</Typography>
                  <Typography>User Address: {orderDetail.User?.address}</Typography>
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
                      {orderDetail.orderItem?.map((item, index) => {
                        return (
                          <TableRow key={item.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.productId}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{currFormatter(item.price)}</TableCell>
                            <TableCell>{currFormatter(item.total)}</TableCell>
                          </TableRow>
                        )
                      })}
                      <TableRow>
                        <TableCell colSpan={2}></TableCell>
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell>{currFormatter(orderDetail.totalOrder)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}></TableCell>
                        <TableCell colSpan={2}>Ongkir</TableCell>
                        <TableCell>{currFormatter(orderDetail.totalOngkir)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}></TableCell>
                        <TableCell colSpan={2}>Grand Total</TableCell>
                        <TableCell>
                          {currFormatter(orderDetail.totalOrder + orderDetail.totalOngkir)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  )
}

export default OrderUserTable
