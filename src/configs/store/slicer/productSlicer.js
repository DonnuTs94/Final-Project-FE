import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../../api/api"

const initialState = {
  productData: null,
  loading: false,
  error: null
}

const fetchProductData = createAsyncThunk("product", async (params, thunkAPI) => {
  try {
    const response = await axiosInstance.get("product/", { params })
    return response.data.data
  } catch (err) {
    console.log(err)
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

const productSlicer = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.loading = false
        state.productData = action.payload
        state.error = null
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export { fetchProductData }

export default productSlicer.reducer
