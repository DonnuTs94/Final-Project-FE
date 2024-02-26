import { configureStore } from "@reduxjs/toolkit"
import userSlicer from "./slicer/userSlicer"
import productSlicer from "./slicer/adminProductSlicer"
import cartSlicer from "./slicer/cartSlicer"
import querySlicer from "./slicer/querySlicer"

const store = configureStore({
  reducer: {
    users: userSlicer,
    product: productSlicer,
    carts: cartSlicer,
    queryProduct: querySlicer
  }
})

export default store
