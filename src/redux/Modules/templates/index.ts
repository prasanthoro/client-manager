"use client";

import { userLoginSliceReducer } from "../userlogin";
import { templateSliceReducer } from "./template.slice";

const combinedReducer = {
  ...userLoginSliceReducer,
  ...templateSliceReducer,
};

export * from "../templates/template.slice";
export default combinedReducer;
