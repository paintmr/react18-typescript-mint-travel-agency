import React from 'react';
import { useParams } from 'react-router-dom';

// 注意，這裡只能用type來定義，不能用interface，因為useParams()這個勾子函數需要傳入的是一個string類型的字符串，而不是對象。interface是定義對象的。而type可以定義各種類別。
// type MatchParams = {
//   touristRouteId: string,
//   tName: string
// }

interface MatchParams {
  touristRouteId: string,
  tName: string
}

export const DetailPage: React.FC = (props) => {
  console.log(useParams())
  // 用"touristRouteId"给useParams()做好泛型定義
  // const params = useParams<"touristRouteId">()
  // 如果傳入的參數超過1個
  const params = useParams<keyof MatchParams>()
  return <h1>旅游路线详情页面，路线ID：{params.touristRouteId}</h1>
}
