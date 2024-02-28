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
  Paper,
  Box
} from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import { axiosInstance } from "../../configs/api/api"
import { currFormatter } from "../../helper/formatter"
import { getUserData } from "../../configs/store/slicer/userSlicer"

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
  const [orderId, setOrderId] = useState(0) // Define orderId state
  const [grandTotal, setGrandTotal] = useState(0)

  const location = useLocation()
  const selectedItems = location.state ? location.state.selectedItems || [] : []

  useEffect(() => {
    fetchProvinces()
    fetchCartItems()
  }, [])

  useEffect(() => {
    calculateTotalProduct()
  }, [cartItems])

  useEffect(() => {
    const selectedServiceCost = cityCosts[0]?.costs.find(
      (service) => service.service === shippingOption
    )?.cost[0]?.value
    setTotalShipping(selectedServiceCost)
  }, [shippingOption])

  useEffect(() => {
    getUserData()
  }, [showPayment])

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
      setShippingOption("")
    } catch (error) {
      console.error("Error fetching cities:", error)
    }
  }

  const fetchCartItems = async () => {
    try {
      const response = await axiosInstance.get("/carts")
      const cartProducts = response.data.data
      const productIds = cartProducts.map((product) => product.productId)
      const products = await axiosInstance.get("/product/table")
      const filteredProducts = products.data.data.filter((product) =>
        productIds.includes(product.id)
      )
      const updatedCartItems = cartProducts.map((cartItem) => {
        const product = filteredProducts.find((product) => product.id === cartItem.productId)
        return {
          ...cartItem,
          product
        }
      })
      setCartItems(filterSelectedItems(updatedCartItems, selectedItems))
      calculateTotalProduct()
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
          origin: 501,
          destination: value.city_id,
          weight,
          courier: "jne"
        })
        if (response.data.data) {
          setCityCosts(response.data.data)
        } else {
          console.error("Invalid response structure:", response.data)
        }
      } catch (error) {
        console.error("Error fetching city costs:", error)
      }
    }
  }

  const onHandleShippingOptionChange = (event) => {
    setShippingOption(event.target.value)
  }

  const handleOrder = async () => {
    try {
      if (!shippingOption) {
        alert("Please select a shipping option")
        return
      }

      const availableShippingOptions = cityCosts.flatMap((cost) =>
        cost.costs.map((service) => service.service)
      )
      if (!availableShippingOptions.includes(shippingOption)) {
        alert(
          "Shipping option is not available for the selected destination. Please choose another option."
        )
        return
      }

      const cartIds = cartItems.map((item) => item.id)
      const response = await axiosInstance.post("/orders/create", {
        cartId: cartIds,
        destination: parseInt(selectedCity.city_id),
        weight,
        shippingOption
      })

      console.log("Order berhasil dibuat:", response.data)
      setOrderId(response.data.data.id) // Set orderId

      // Calculate grandTotal
      const productTotal = cartItems.reduce((acc, cartItem) => acc + cartItem.total, 0)
      setGrandTotal(productTotal + totalShipping)

      setShowPayment(true)
    } catch (error) {
      console.error("Error creating order:", error)
      if (error.response && error.response.data && error.response.data.message) {
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

  const initiatePayment = async () => {
    try {
      console.log("orderId:", orderId)
      console.log("grandTotal:", grandTotal)

      const response = await axiosInstance.post("/payment/transaction", {
        order_id: parseInt(orderId),
        gross_amount: Number(grandTotal)
      })

      console.log("Payment response:", response)
      // Redirect user to payment page
      window.location(
        `https://app.sandbox.midtrans.com/snap/v3/redirection/${response.data.token}`,
        "_blank"
      )

      const webHookResponse = await axiosInstance.post("/webhook/midtrans", {
        transaction_status: "settlement",
        order_id: orderId
      })

      console.log("Webhook response:", webHookResponse)
    } catch (error) {
      console.error("Error initiating payment:", error)
      // Handle error
    }
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: "20px" }}>
        Order Page
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
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
            <Autocomplete
              options={provinces}
              getOptionLabel={(option) => option.province}
              value={selectedProvince}
              onChange={handleProvinceChange}
              renderInput={(params) => (
                <TextField {...params} label="Province" variant="outlined" />
              )}
              placeholder="Select Province"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Autocomplete
              options={cities}
              getOptionLabel={(option) => option.type + " " + option.city_name}
              value={selectedCity}
              onChange={handleCityChange}
              renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
              disabled={!selectedProvince}
              placeholder="Select City"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Shipping Option</InputLabel>
            <Select
              label="Shipping Option"
              value={shippingOption}
              onChange={onHandleShippingOptionChange}
            >
              {cityCosts.map((cost) =>
                cost.costs.map((service) => (
                  <MenuItem key={`${service.service}`} value={`${service.service}`}>
                    {cost.name} - {service.service} ({cost.code}) - {service.cost[0].value} (ETD:{" "}
                    {service.cost[0].etd})
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          <Button
            sx={{ justifySelf: "center" }}
            variant="contained"
            color="primary"
            onClick={handleOrder}
          >
            Order Now
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            paddingTop: "60px",
            // paddingLeft: "50px",
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
                        <Typography variant="body1">{currFormatter(cartItem.total)}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index !== cartItems.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>

              <Divider />
              <Box
                width="100%"
                marginTop={2}
                display="flex"
                gap={1}
                flexDirection="column"
                alignItems="flex-end"
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <Box width="50%" component="span">
                    Total Product:
                  </Box>
                  <Box component="span">{currFormatter(totalProduct)}</Box>
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <Box width="50%" component="span">
                    Total Shipping:
                  </Box>
                  <Box component="span">
                    {isNaN(totalShipping) ? "-" : currFormatter(totalShipping)}
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <Box width="50%" component="span">
                    Grand Total:
                  </Box>
                  <Box component="span">{isNaN(grandTotal) ? "-" : currFormatter(grandTotal)}</Box>
                </Typography>
              </Box>
            </Paper>
          )}
          {showPayment && (
            <Box
              display="flex"
              flexDirection="column"
              gap={4}
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h5" gutterBottom>
                Select Payment Method:
              </Typography>
              <Button variant="contained" color="primary" onClick={initiatePayment}>
                Pay with Midtrans
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setShowPayment(false)}>
                Cancel
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Order
