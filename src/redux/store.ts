import { createStore } from 'redux'
import languageReducer from './language/languageReducer';
import { devToolsEnhancer } from '@redux-devtools/extension';

const store = createStore(languageReducer,devToolsEnhancer())

// 通過ReturnType可以提取某函數的函數類型
export type RootState = ReturnType<typeof store.getState>

export default store;