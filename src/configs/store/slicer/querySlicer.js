import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  queryProduct: ""
}

const querySlicer = createSlice({
  name: "query",
  initialState,
  reducers: {
    changeQuery: (state, action) => {
      state.queryProduct = action.payload
    }
  }
})

export const { changeQuery } = querySlicer.actions
export default querySlicer.reducer
