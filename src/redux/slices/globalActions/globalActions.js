import { createAsyncThunk } from "@reduxjs/toolkit";

//reset error action

export const resetErrAction = createAsyncThunk("resetErr", () => {
  return {};
});

//reset success action

export const resetSuccessAction = createAsyncThunk("resetSuccess", () => {
  return {};
});
