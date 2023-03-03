// action types
export const ADD_LANGUAGE = 'ADD_LANGUAGE'
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

// 定義action creators，並嚴格定義其type為指定的字符串
interface AddLanguageAction {
  type: typeof ADD_LANGUAGE;
  payload: { name: string, code: string };
}

interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE;
  payload: "zh" | "en";
}


// 導出上面的2個action定義，以供reducer使用
export type LanguageActionTypes = AddLanguageAction | ChangeLanguageAction

// action creators
export const addLanguageActionCreator = (payload:{name:string,code:string}):AddLanguageAction => {
  return {
    type: ADD_LANGUAGE,
    payload
  }
}

export const changeLanguageActionCreator = (payload: 'zh' | 'en'):ChangeLanguageAction => {
  return {
    type: CHANGE_LANGUAGE,
    payload
  }
}
