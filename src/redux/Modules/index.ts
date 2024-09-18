import { combineReducers } from "@reduxjs/toolkit";
import userLoginReducer from "./userlogin";
import { templateSliceReducer } from "./templates/template.slice";

export const combinedReducer = combineReducers({
  ...userLoginReducer,
  ...templateSliceReducer,
});
