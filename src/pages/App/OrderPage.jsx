import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Grid,
  Paper
} from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import { axiosInstance } from "../../configs/api/api"

const Order = () => {
  const [weight] = useState(2000)
  const [shippingOption, setShippingOption] = useState("")
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [showPayment, setShowPayment] = useState(false)
  const [cityCosts, setCityCosts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [totalProduct, setTotalProduct] = useState(0)
  const [totalShipping, setTotalShipping] = useState(0)

  const location = useLocation()
  const selectedItems = location.state ? location.state.selectedItems || [] : []

  useEffect(() => {
    fetchProvinces()
    fetchCartItems()
  }, [])

  useEffect(() => {
    // Hitung total produk setiap kali ada perubahan pada item-item keranjang yang dipilih
    calculateTotalProduct()
  }, [cartItems])

  const fetchProvinces = async () => {
    try {
      const response = await axiosInstance.get("/shippingCost/province")
      setProvinces(response.data.data)
    } catch (error) {
      console.error("Error fetching provinces:", error)
    }
  }

  const fetchCitiesByProvince = async (provinceId) => {
    try {
      const response = await axiosInstance.get(`/shippingCost/city?province=${provinceId}`)
      setCities(response.data.data)
    } catch (error) {
      console.error("Error fetching cities:", error)
    }
  }

  const fetchCartItems = async () => {
    try {
      const response = await axiosInstance.get("/carts")
      const cartProducts = response.data.data
      const productIds = cartProducts.map((product) => product.productId)
      const products = await axiosInstance.get("/product")
      const filteredProducts = products.data.data.filter((product) =>
        productIds.includes(product.id)
      )
      const updatedCartItems = cartProducts.map((cartItem) => {
        const product = filteredProducts.find((product) => product.id === cartItem.productId)
        return {
          ...cartItem,
          product: product
        }
      })
      setCartItems(filterSelectedItems(updatedCartItems, selectedItems))
      calculateTotalProduct() // Panggil calculateTotalProduct setelah pembaruan cartItems
    } catch (error) {
      console.error("Error fetching cart items:", error)
    }
  }

  const calculateTotalProduct = () => {
    const total = cartItems.reduce((acc, cartItem) => acc + cartItem.total, 0)
    setTotalProduct(total)
  }

  const filterSelectedItems = (cartItems, selectedItems) => {
    return cartItems.filter((item) => selectedItems.includes(item.id))
  }

  const handleProvinceChange = (event, value) => {
    setSelectedProvince(value)
    setSelectedCity(null)
    setCityCosts([])
    if (value) {
      fetchCitiesByProvince(value.province_id)
    }
  }

  const handleCityChange = async (event, value) => {
    setSelectedCity(value)
    if (value) {
      try {
        const response = await axiosInstance.post(`/shippingCost/cost`, {
          origin: selectedProvince.province_id,
          destination: value.city_id,
          weight,
          courier: "jne"
        })
        if (response.data.data) {
          setCityCosts(response.data.data)

          // Calculate total shipping
          const shippingCost = response.data.data.reduce((acc, curr) => {
            const selectedService = curr.costs[0]
            return acc + selectedService.cost[0].value
          }, 0)
          setTotalShipping(shippingCost)
        } else {
          console.error("Invalid response structure:", response.data)
        }
      } catch (error) {
        console.error("Error fetching city costs:", error)
      }
    }
  }

  // Tambahkan validasi sebelum membuat pesanan
  const handleOrder = async () => {
    try {
      if (!shippingOption) {
        alert("Please select a shipping option")
        return
      }

      // Tambahkan validasi untuk memastikan opsi pengiriman yang dipilih tersedia
      const availableShippingOptions = cityCosts.flatMap((cost) =>
        cost.costs.map((service) => service.service)
      )
      if (!availableShippingOptions.includes(shippingOption)) {
        alert(
          "Shipping option is not available for the selected destination. Please choose another option."
        )
        return
      }

      // Lanjutkan dengan membuat pesanan jika opsi pengiriman tersedia
      const cartIds = cartItems.map((item) => item.id)
      const response = await axiosInstance.post("/orders/create", {
        cartId: cartIds,
        destination: parseInt(selectedCity.city_id),
        weight,
        shippingOption
      })

      console.log("Order berhasil dibuat:", response.data)
      setShowPayment(true)
    } catch (error) {
      console.error("Error creating order:", error)
      if (error.response && error.response.data && error.response.data.message) {
        // Handle specific error message
        if (
          error.response.data.message === "Shipping cost is not available for the selected option"
        ) {
          alert(
            "Shipping cost is not available for the selected option. Please choose another shipping option."
          )
        } else {
          alert(error.response.data.message)
        }
      } else {
        alert("An error occurred while creating the order. Please try again later.")
      }
    }
  }

  const handlePayment = () => {
    console.log("Menampilkan metode pembayaran Midtrans...")
  }

  const grandTotal = totalProduct + totalShipping

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: "20px" }}>
        Order Page
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            Enter Order Details:
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Weight (grams)"
            type="number"
            value={weight}
            InputProps={{ disabled: true, style: { fontWeight: "bold" } }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel></InputLabel>
            <Autocomplete
              options={provinces}
              getOptionLabel={(option) => option.province}
              value={selectedProvince}
              onChange={handleProvinceChange}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
              placeholder="Select Province"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel></InputLabel>
            <Autocomplete
              options={cities}
              getOptionLabel={(option) => option.type + " " + option.city_name}
              value={selectedCity}
              onChange={handleCityChange}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
              disabled={!selectedProvince}
              placeholder="Select City"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Shipping Option</InputLabel>
            <Select
              label="Shipping Option"
              value={shippingOption}
              onChange={(e) => setShippingOption(e.target.value)}
            >
              {cityCosts.map((cost) =>
                cost.costs.map((service) =>
                  ["REG", "OKE"].includes(service.service) ? (
                    <MenuItem key={`${service.service}`} value={`${service.service}`}>
                      {cost.name} - {service.service} ({cost.code})
                    </MenuItem>
                  ) : null
                )
              )}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={handleOrder}>
            Order Now
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            paddingTop: "60px",
            paddingLeft: "50px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {!showPayment && (
            <Paper elevation={3} style={{ padding: 20 }}>
              <Typography variant="h6" gutterBottom>
                Orders Items
              </Typography>
              <List>
                {cartItems.map((cartItem, index) => (
                  <React.Fragment key={cartItem.id}>
                    <ListItem>
                      {cartItem.product ? (
                        <ListItemText
                          primary={cartItem.product.name}
                          secondary={`Quantity: ${cartItem.quantity}`}
                        />
                      ) : (
                        <ListItemText primary="Product Not Found" />
                      )}
                      <ListItemSecondaryAction>
                        <Typography variant="body1">${cartItem.total}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index !== cartItems.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>

              <Divider />
              <Typography variant="h6" gutterBottom style={{ marginTop: 10 }}>
                Total Product: ${totalProduct}
              </Typography>
              <Typography variant="h6" gutterBottom style={{ marginTop: 10 }}>
                Total Shipping: ${totalShipping}
              </Typography>
              <Typography variant="h6" gutterBottom style={{ marginTop: 10 }}>
                Grand Total: ${grandTotal}
              </Typography>
            </Paper>
          )}
          {showPayment && (
            <div>
              <Typography variant="h5" gutterBottom>
                Select Payment Method:
              </Typography>
              <Button variant="contained" color="primary" onClick={handlePayment}>
                Pay with Midtrans
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setShowPayment(false)}>
                Cancel
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Order
