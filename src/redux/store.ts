import { createStore, combineReducers, applyMiddleware } from 'redux'
import languageReducer from './language/languageReducer';
import recommendProductsReducer from './recommendProducts/recommendProductsReducers';
// 用於配置redux的開發者工具
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer
})

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

// 通過ReturnType可以提取某函數的函數類型
export type RootState = ReturnType<typeof store.getState>

export default store;