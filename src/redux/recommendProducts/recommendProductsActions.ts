import { ThunkAction } from "redux-thunk/es/types"
import { RootState } from "../store"
import axios from 'axios';

// action types
export const FETCH_REDOMMEND_PRODUCTS_START = 'FETCH_REDOMMEND_PRODUCTS_START'
export const FETCH_REDOMMEND_PRODUCTS_SUCCESS = 'FETCH_REDOMMEND_PRODUCTS_SUCCESS'
export const FETCH_REDOMMEND_PRODUCTS_FAILURE = 'FETCH_REDOMMEND_PRODUCTS_FAILURE'

// 定義action creators，並嚴格定義其type為指定的字符串
interface FetchRecommendProductsStart {
  type: typeof FETCH_REDOMMEND_PRODUCTS_START
}

interface FetchRecommendProductsSuccess {
  type: typeof FETCH_REDOMMEND_PRODUCTS_SUCCESS,
  payload:any
}

interface FetchRecommendProductsFailure {
  type: typeof FETCH_REDOMMEND_PRODUCTS_FAILURE,
  payload:any
}

// 導出上面3個action定義，供reducer使用
export type RecommendProductActionTypes = FetchRecommendProductsStart | FetchRecommendProductsSuccess | FetchRecommendProductsFailure

// action creators
const fetchRecommendProductsStart = (): FetchRecommendProductsStart => {
  return {
    type: FETCH_REDOMMEND_PRODUCTS_START
  }
}

const fetchRecommendProductsSuccess = (data): FetchRecommendProductsSuccess => {
  return {
    type: FETCH_REDOMMEND_PRODUCTS_SUCCESS,
    payload:data
  }
}

const fetchRecommendProductsFailure = (data): FetchRecommendProductsFailure => {
  return {
    type: FETCH_REDOMMEND_PRODUCTS_FAILURE,
    payload:data
  }
}

// thunk 可以返回一個函數，而不一定是js對象
// 在一個thunk action中可以完成一些列連續的action操作
// 並且可以處理異步邏輯
// 從服務器請求數據的業務邏輯可以從ui層面挪到這裏，代碼分層會更清晰
// ThunkAction定義異步請求的action。它的泛型定義需要4個參數：ReturnType, State, ExtraThunkArg, BasicAction extends Action<any>
// 參數1：ReturnType。規定本action creator的函數返回值。這個例子中不需要返回，所以是空的
// 參數2：定義State。這裡可以放RootState
// 參數3：ExtraThunkArg，額外參數。這個例子裡沒有，所以寫unknown或undefined
// 參數4：BasicAction extends Action<any>。定義action的類型。這裡可以用上面定義好的RecommendProductActionTypes。
// 這是高階函數的寫法const a = ()=>()=>{}

export const fetchRecommendProducts = ():ThunkAction<void, RootState, unknown, RecommendProductActionTypes> => 
   async (dispatch, getState)=> {
    dispatch(fetchRecommendProductsStart())
    try {
      const { data } = await axios.get("http://123.56.149.216:8080/api/productCollections")
      dispatch(fetchRecommendProductsSuccess(data))
    } catch (error) {
      dispatch(fetchRecommendProductsFailure(error instanceof Error ? error.message:'error')) 
    }
  }

// 我在別的項目裡是用下面這種寫法，把(dispatch, getState)=> {}這個函數return出來
// export const fetchRecommendProducts = ():ThunkAction<void, RootState, unknown, RecommendProductActionTypes> => {
//   return async (dispatch, getState)=> {
//     dispatch(fetchRecommendProductsStart())
//     try {
//       const { data } = await axios.get("http://123.56.149.216:8080/api/productCollections")
//       dispatch(fetchRecommendProductsSuccess(data))
//     } catch (error) {
//       if (error instanceof Error) {
//         dispatch(fetchRecommendProductsFailure(error))
//       }
//     }
//   }
// }
