import { createStore } from 'redux'
import languageReducer from './languageReducer';
import { devToolsEnhancer } from '@redux-devtools/extension';

const store = createStore(languageReducer,devToolsEnhancer())

export default store;