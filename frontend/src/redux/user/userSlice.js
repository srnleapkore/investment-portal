import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  signUpData: null,
  loginData: null,
  logoutData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signUpSuccess: (state, action) => {
      state.signUpData = action.payload;
    },
    logOutMSuccess: (state, action) => {
      state.logoutData = action.payload;
    },
    loginSuccess: (state, action) => {
      state.loginData = action.payload;
    },
    clearError: (state) => {
      state.error = null;
      state.loading = false;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = true;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state,action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) =>{
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpSuccess,
  logOutMSuccess,
  loginSuccess,
  clearError,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  logoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
