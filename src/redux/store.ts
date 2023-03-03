import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import languageReducer from './language/languageReducer';
import recommendProductsReducer from './recommendProducts/recommendProductsReducers';
import productDetailReducer from './productDetail/slice';
import { combineReducers } from "redux";

import { actionLog } from './middleware/actionLog';

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailReducer
})

const store = configureStore({
  reducer: rootReducer,
  // 如果中间件只用到redux-thunk，middleware这个字段可以不用写
  middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(actionLog)),
  // devTools默認開啟的，下面這行可以不用寫
  devTools:true
})

// const store = configureStore({
//   reducer: {
//     language: languageReducer,
//     recommendProducts: recommendProductsReducer,
//     productDetail: productDetailReducer
//   }
// })

// 通過ReturnType可以提取某函數的函數類型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;