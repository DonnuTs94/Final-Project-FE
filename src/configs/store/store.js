import { configureStore } from "@reduxjs/toolkit"
import userSlicer from "./slicer/userSlicer"

const store = configureStore({
  reducer: {
    users: userSlicer
  }
})

export default store
