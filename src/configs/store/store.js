import { configureStore } from "@reduxjs/toolkit"
import userSlicer from "./slicer/userSlicer"
import productSlicer from "./slicer/adminProductSlicer"

const store = configureStore({
  reducer: {
    users: userSlicer,
    product: productSlicer
  }
})

export default store
