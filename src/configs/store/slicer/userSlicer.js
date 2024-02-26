import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../../api/api"

const initialState = {
  userData: null,
  loading: false,
  error: null
}

const userLogin = createAsyncThunk("users/userLogin", async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.post("auth/login", data)
    return response.data
  } catch (err) {
    console.log(err)
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

const getUserData = createAsyncThunk("users/getUserData", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("user/profile")
    return response.data.user
  } catch (err) {
    console.log(err)
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

const updateCart = createAsyncThunk("users/updateCart", async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.put("carts/update", data)
    return response.data.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

const deleteItemInCart = createAsyncThunk("users/deleteItemInCart", async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`carts/delete/${data}`)
    return response.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

const userSlicer = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false
        state.userData = action.payload.data
        state.error = null
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getUserData.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false
        state.userData = { ...action.payload }
        state.error = null
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false
        state.userData = {
          ...state.userData,
          cart: state.userData.cart.map((item) => {
            return item.productId === action.payload.productId
              ? { ...item, quantity: action.payload.quantity, total: action.payload.total }
              : item
          })
        }
        state.error = null
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteItemInCart.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteItemInCart.fulfilled, (state, action) => {
        state.loading = false
        state.userData = {
          ...state.userData,
          cart: state.userData.cart.filter((item) => item.id !== action.payload.removeCart.id)
        }
      })
      .addCase(deleteItemInCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { logout } = userSlicer.actions
export { userLogin, getUserData, updateCart, deleteItemInCart }
export default userSlicer.reducer
