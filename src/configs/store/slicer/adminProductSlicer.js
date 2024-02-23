import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../../api/api"

const initialState = {
  productData: null,
  loading: false,
  error: null
}

const fetchAdminProductData = createAsyncThunk("admin/product", async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.get("product/table", data)
    return response.data.data // Return response data
  } catch (err) {
    console.log(err)
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

const adminProductSlicer = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProductData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAdminProductData.fulfilled, (state, action) => {
        state.loading = false
        state.productData = action.payload
        state.error = null
      })
      .addCase(fetchAdminProductData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export { fetchAdminProductData }
export default adminProductSlicer.reducer
