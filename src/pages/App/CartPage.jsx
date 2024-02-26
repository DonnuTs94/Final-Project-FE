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
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserData, updateCart } from "../../configs/store/slicer/userSlicer"
import { BASE_URL } from "../../configs/constant/baseUrl"
import { selectItem } from "../../configs/store/slicer/cartSlicer"
import { useNavigate } from "react-router-dom"

const CounterButton = ({ value, productId, onChangeQty }) => {
  const handleIncrement = async () => {
    onChangeQty(value + 1, productId)
  }

  const handleDecrement = () => {
    onChangeQty(value - 1, productId)
  }

  return (
    <Box fontSize={5} display="flex" gap={1} alignItems="center" justifyContent="center">
      <IconButton
        color="secondary"
        size="medium"
        sx={{ fontSize: "20px", fontWeight: 600, paddingX: 2 }}
        onClick={handleDecrement}
        disabled={value === 0}
      >
        -
      </IconButton>
      <Typography variant="body1" marginX={2}>
        {value}
      </Typography>
      <IconButton
        color="secondary"
        size="small"
        sx={{ fontSize: "12px", fontWeight: 600, paddingX: 2 }}
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
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    getUserCart()
    setCart(userData?.cart)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, loading])

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
      width: 150
    },
    {
      field: "quantity",
      headerName: "Quantity",
      align: "center",
      width: 200,
      innerHeight: 100,
      outerHeight: 120,
      renderCell: (params) => (
        <CounterButton
          value={params.value}
          productId={params.row.productId}
          onChangeQty={onChangeQty}
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

  return (
    <Box paddingY={4} display="flex" gap={2} paddingX={10} marginX={"auto"} fontSize={5}>
      <Paper sx={{ height: "100%", width: "75%", textAlign: "center" }}>
        {loading ? (
          <CircularProgress color="secondary" />
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
        <Divider sx={{ marginBottom: 2 }} />
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
          onClick={() => navigate("/order")}
        >
          Checkout
        </Button>
      </Paper>
    </Box>
  )
}

export default CartPage
