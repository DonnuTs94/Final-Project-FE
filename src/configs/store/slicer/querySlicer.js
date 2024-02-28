import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  queryProduct: {
    name: "",
    category: "",
    page: 1
  }
}

const querySlicer = createSlice({
  name: "query",
  initialState,
  reducers: {
    changeQuery: (state, action) => {
      state.queryProduct = { ...state.queryProduct, ...action.payload }
    }
  }
})

export const { changeQuery } = querySlicer.actions
export default querySlicer.reducer
