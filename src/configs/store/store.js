import { configureStore } from "@reduxjs/toolkit"
import userSlicer from "./slicer/userSlicer"
import adminProductSlicer from "./slicer/adminProductSlicer"
import cartSlicer from "./slicer/cartSlicer"
import productSlicer from "./slicer/productSlicer"

const store = configureStore({
  reducer: {
    users: userSlicer,
    adminProduct: adminProductSlicer,
    carts: cartSlicer,
    product: productSlicer
  }
})

export default store
