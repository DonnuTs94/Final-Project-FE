import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  selectedCarts: []
}

const cartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    selectItem: (state, action) => {
      state.selectedCarts = [...action.payload]
    }
  }
})

export const { selectItem } = cartSlicer.actions
export default cartSlicer.reducer
