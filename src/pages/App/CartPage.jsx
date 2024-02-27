import { useEffect, useState } from "react"
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Typography
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useDispatch, useSelector } from "react-redux"
import { deleteItemInCart, getUserData, updateCart } from "../../configs/store/slicer/userSlicer"
import { BASE_URL } from "../../configs/constant/baseUrl"
import { selectItem } from "../../configs/store/slicer/cartSlicer"
import { useLocation, useNavigate } from "react-router-dom"
import ConfirmDialogDelete from "../../components/admin/ConfirmDialogDelete"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const CounterButton = ({ value, productId, cartId, onChangeQty, onConfirmDelete }) => {
  const handleIncrement = async () => {
    onChangeQty(value + 1, productId)
  }

  const handleDecrement = () => {
    if (value === 1) {
      onConfirmDelete(cartId)
    } else {
      onChangeQty(value - 1, productId)
    }
  }

  return (
    <Box fontSize={5} display="flex" gap={1} alignItems="center" justifyContent="center">
      <IconButton
        color="warning"
        size="medium"
        sx={{ fontSize: "20px", fontWeight: 600, paddingX: 2 }}
        onClick={handleDecrement}
        disabled={value === 0}
      >
        -
      </IconButton>
      <Typography variant="h6" marginX={2}>
        {value}
      </Typography>
      <IconButton
        color="success"
        size="medium"
        sx={{ fontSize: "20px", fontWeight: 600, paddingX: 2 }}
        onClick={handleIncrement}
      >
        +
      </IconButton>
    </Box>
  )
}

const ProductDetail = ({ product }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box
        component="img"
        src={BASE_URL + product?.productImages[0]?.imageUrl}
        alt="productImages"
        width={"50%"}
      />
      <Box paddingX={2}>{product.name}</Box>
    </Box>
  )
}

const CartPage = () => {
  const { userData, loading } = useSelector((state) => state.users)
  const { selectedCarts } = useSelector((state) => state.carts)
  const [cart, setCart] = useState([])
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [removeCartId, setRemoveCartId] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation().pathname

  useEffect(() => {
    getUserCart()

    if (location === "/cart") {
      getUserCart()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, loading, location])

  const columns = [
    { field: "no", headerName: "No.", width: 40 },
    {
      field: "product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => <ProductDetail product={params.value} />
    },
    {
      field: "price",
      headerName: "Price",
      width: 100
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 180,
      renderCell: (params) => (
        <CounterButton
          value={params.value}
          productId={params.row.productId}
          cartId={params.row.id}
          onChangeQty={onChangeQty}
          onConfirmDelete={onOpenDialogDelete}
        />
      )
    },
    {
      field: "subtotal",
      headerName: "Subtotal",
      width: 160
    }
  ]

  const onChangeQty = (qty, productId) => {
    dispatch(updateCart({ quantity: qty, productId: productId }))
  }

  const handleSelectItem = (selectionModel) => {
    dispatch(selectItem(selectionModel))
  }

  const onOpenDialogDelete = (productId) => {
    setOpenDialogDelete(true)
    setRemoveCartId(productId)
  }

  const onCloseDialogDelete = () => {
    setOpenDialogDelete(false)
  }

  const handleDelete = (cartId) => {
    dispatch(deleteItemInCart(cartId))
    toast.success("Success delete product", {
      position: "bottom-center"
    })
    dispatch(getUserData)
  }

  const getUserCart = () => {
    dispatch(getUserData)
    setCart(userData?.cart)
  }

  const rows = cart?.map((item, index) => {
    return {
      id: item.id,
      productId: item.productId,
      no: index + 1,
      product: item.Product,
      price: item.Product.price,
      quantity: item.quantity,
      subtotal: item.total
    }
  })

  const handleCheckout = () => {
    if (selectedCarts.length > 0) {
      navigate("/order", { state: { selectedItems: selectedCarts } })
    } else {
      alert("Please select at least one item before proceeding to checkout.")
    }
  }

  return (
    <Box paddingY={4} display="flex" gap={2} paddingX={10} marginX={"auto"} fontSize={5}>
      <Paper
        sx={{
          minHeight: "50vh",
          width: "75%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {loading ? (
          <CircularProgress color="secondary" size={80} />
        ) : cart === null || cart?.length === 0 ? (
          <Typography variant="h3">Cart Empty</Typography>
        ) : (
          <DataGrid
            rows={rows || []}
            columns={columns}
            getRowId={(row) => row.id}
            rowHeight={120}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={handleSelectItem}
            rowSelectionModel={selectedCarts}
          />
        )}
      </Paper>
      <Paper sx={{ height: "fit-content", width: "25%", padding: 2 }}>
        <Typography variant="h3">Cart Totals</Typography>
        <Divider sx={{ marginBottom: 8 }} />
        <Typography variant="h5" display="flex" justifyContent="space-between">
          <Box component={"span"}>Items:</Box>
          <Box component={"span"} fontWeight={600}>
            {selectedCarts?.length}
          </Box>
        </Typography>
        <Typography variant="h5" display="flex" justifyContent="space-between">
          <Box component={"span"}>Subtotal:</Box>
          <Box component={"span"} fontWeight={600}>
            {userData?.cart
              ?.filter((item) => selectedCarts.includes(item.id))
              .reduce((total, item) => total + item.total, 0)}
          </Box>
        </Typography>
        <Button
          fullWidth
          color="inherit"
          sx={{ marginTop: 2, paddingY: 1, backgroundColor: "secondary.main" }}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Paper>

      <ConfirmDialogDelete
        open={openDialogDelete}
        close={onCloseDialogDelete}
        handleDelete={handleDelete}
        productId={removeCartId}
        dialog={"Are you sure want to remove this product from cart?"}
      />
      <ToastContainer />
    </Box>
  )
}

export default CartPage
