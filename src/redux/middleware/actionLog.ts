import { Middleware } from "redux";

export const actionLog: Middleware = (store) => (next) => (action) => {
  console.log("——————state: ", store.getState())
  console.log("fire action: ", action)
  next(action)
  console.log("state updated: ", store.getState())
}