"use client";
import { createSlice } from "@reduxjs/toolkit";

import { IReduxUserLogin } from "./userlogin";

const reducerName = "userLogin";

export const initialState: IReduxUserLogin.IInitialLoginState = {
  userDetails: {
    id: "",
    scope: "",
    access_token: "",
    token_type: "",
    username: "",
  },
  profile: {},
  userRequestedActionTime: "",
  sessionExpiredOtNot: false,
};

export const userLoginSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    setUserDetails: (state: any, action: any) => {
      state.userDetails = { ...action.payload };
    },
    removeUserDetails: (state: any) => {
      state.userDetails = {};
    },
    setProfileDetails: (state: any, action: any) => {
      state.profile = action.payload;
    },
    deleteProfileDetails: (state: any) => {
      state.profile = {};
    },

    setSessionTimedOut: (state: any, action: any) => {
      state.sessionExpiredOtNot = action.payload;
    },
  },
});

export const {
  setUserDetails,
  removeUserDetails,
  setProfileDetails,
  deleteProfileDetails,
  setSessionTimedOut,
} = userLoginSlice.actions;
export const userLoginSliceReducer = { [reducerName]: userLoginSlice.reducer };
