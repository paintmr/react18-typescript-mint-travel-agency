// 用src/redux/hooks.ts解耦UI組件和store
// useSelector獲取store的state數據
// 因為導出的加強版名字也是useSelector，所以給引入的useSelector改個名，叫useReduxSelector
import { useSelector as useReduxSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from './store'

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useAppDispatch=()=>useDispatch<AppDispatch>()