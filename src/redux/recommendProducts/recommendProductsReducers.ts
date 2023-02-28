import { FETCH_REDOMMEND_PRODUCTS_START, FETCH_REDOMMEND_PRODUCTS_SUCCESS, FETCH_REDOMMEND_PRODUCTS_FAILURE, RecommendProductActionTypes } from "./recommendProductsActions";

export interface RecommendProductsState {
  loading: boolean,
  error: string | null,
  productList: any[]
}

const defaultState: RecommendProductsState = {
  loading: true,
  error: null,
  productList: []
}

// 定義action
const recommendProductsReducer = (state = defaultState, action: RecommendProductActionTypes) => {
  switch (action.type) {
    case FETCH_REDOMMEND_PRODUCTS_START:
      return {
        ...state,
        loading: true
      }
    case FETCH_REDOMMEND_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        productList: action.payload
      }
    case FETCH_REDOMMEND_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error:action.payload
      }
    default:
      return state
  }
}

export default recommendProductsReducer