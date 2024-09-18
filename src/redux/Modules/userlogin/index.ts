"use client";
import { userLoginSliceReducer } from "./userlogin.slice";
// import { userLoginSliceReducer } from "./../userlogin/userlogin.slice";

const combinedReducer = {
  auth: userLoginSliceReducer,
  ...userLoginSliceReducer,
};

export * from "./userlogin.slice";
export default combinedReducer;
