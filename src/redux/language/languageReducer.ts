// 引入action types和action type的定義
import { ADD_LANGUAGE, CHANGE_LANGUAGE, LanguageActionTypes } from "./languageActions"

// 定義state
export interface LanguageState{
  language: "en" | "zh",
  languageList: {name:string, code:string}[]
}

const defaultState: LanguageState = {
  language: "zh",
  languageList: [
    { name: "中文", code: "zh" },
    { name: "English", code: "en" },
  ]
}

// 定義action
const languageReducer = (state = defaultState, action:LanguageActionTypes) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      console.log(action.payload)
      return {
        ...state,
        language: action.payload
      }
    case ADD_LANGUAGE:
      return {
        ...state,
        languageList: [...state.languageList, action.payload]
      }
    default:
      return state
  }
}

export default languageReducer