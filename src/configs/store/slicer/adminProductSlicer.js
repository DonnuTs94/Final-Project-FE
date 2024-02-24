import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../../api/api"

const initialState = {
  productData: null,
  loading: false,
  error: null
}

const fetchAdminProductData = createAsyncThunk("admin/product", async (searchQuery, thunkAPI) => {
  try {
    console.log(searchQuery)
    if (searchQuery !== undefined) {
      console.log("masuk")
      searchQuery = `?product=${searchQuery}&category=${searchQuery}`

      const response = await axiosInstance.get(`product/table${searchQuery}`)
      console.log(response.data.data)
      return response.data.data
    }

    const response = await axiosInstance.get(`product/table`)
    return response.data.data
  } catch (err) {
    console.log(err)
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

const adminProductSlicer = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {
    clearProductData: (state) => {
      state.productData = null
    }
  },
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

export const { clearProductData } = adminProductSlicer.actions

export { fetchAdminProductData }
export default adminProductSlicer.reducer
