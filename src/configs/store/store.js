import { configureStore } from "@reduxjs/toolkit"
import userSlicer from "./slicer/userSlicer"
import productSlicer from "./slicer/adminProductSlicer"
import cartSlicer from "./slicer/cartSlicer"

const store = configureStore({
  reducer: {
    users: userSlicer,
    product: productSlicer,
    carts: cartSlicer
  }
})

export default store
