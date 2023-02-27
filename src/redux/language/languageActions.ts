// action types
export const ADD_LANGUAGE = 'ADD_LANGUAGE'
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

// 定義actioncreators，並嚴格定義其type為指定的字符串
interface addLanguageAction {
  type: typeof ADD_LANGUAGE,
  newLanguage:{name:string,code:string}
}

interface changeLanguageAction {
  type: typeof CHANGE_LANGUAGE,
  language: "zh" | "en"
}

// 導出上面的2個action定義，以供reducer使用
export type LanguageActionTypes = addLanguageAction | changeLanguageAction

// action creators
export const addLanguageActionCreator = (newLanguage:{name:string,code:string}):addLanguageAction => {
  return {
    type: ADD_LANGUAGE,
    newLanguage
  }
}

export const changeLanguageActionCreator = (languageCode: 'zh' | 'en'):changeLanguageAction => {
  return {
    type: CHANGE_LANGUAGE,
    language: languageCode
  }
}