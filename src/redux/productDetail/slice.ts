import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export interface ProductDetailState {
  loading: boolean;
  // error: string | null;
  error: any;
  product: any;
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  product: null,
}

export const getProductDetail = createAsyncThunk('getProductDetail', async (touristRouteId: string, thunkAPI) => {
  const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
  return data
}
)

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetail.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.product = action.payload
        state.loading = false
      })
      .addCase(getProductDetail.rejected,  (state, action) => {
        state.loading = false;
        // state.error = action.payload;
        state.error = action.error.message;
      })
  }
})

// export const productDetailSlice = createSlice({
//   name: "productDetail",
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [getProductDetail.pending.type]: (state) => {
//       state.loading = true;
//     },
//     [getProductDetail.fulfilled.type]: (state, action) => {
//       state.product = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     [getProductDetail.rejected.type]: (state, action) => {
//       state.loading = false;
//       state.error = action.error.message;
//     },
//   },
// });

export default productDetailSlice.reducer