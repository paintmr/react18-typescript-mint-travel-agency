// useSelector獲取store的state數據
// 因為導出的加強版名字也是useSelector，所以給引入的useSelector改個名，叫useReduxSelector
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from './store'

export const useSelector:TypedUseSelectorHook<RootState>=useReduxSelector