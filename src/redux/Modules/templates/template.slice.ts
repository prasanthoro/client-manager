"use client";
import { createSlice } from "@reduxjs/toolkit";

const reducerName = "template";

export const initialState: any = {
  templateBody: {},
};

export const templateSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    addTemplateData: (state: any, action: any) => {
      state.templateBody = { ...action.payload };
    },
  },
});

export const { addTemplateData } = templateSlice.actions;
export const templateSliceReducer = { [reducerName]: templateSlice.reducer };
