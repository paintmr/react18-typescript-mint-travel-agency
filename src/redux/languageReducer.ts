
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

const languageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      switch (action.language) {
        case "zh":
          return {
            ...state,
            language: action.language
          }
          // return state
        case "en":
            return {
              ...state,
              language: action.language
            }
        default:
          return state
      }
    case "ADD_LANGUAGE":
      console.log(action)
      return {
        ...state,
        languageList: [...state.languageList, {name:action.language,code:action.language}]
      }
    default:
      return state
  }
}

export default languageReducer