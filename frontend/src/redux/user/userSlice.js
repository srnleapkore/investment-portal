import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  signUpData: null,
  loginData: null,
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
    loginSuccess: (state, action) => {
       state.loginData = action.payload;
      },
    clearError: (state) => {
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
  loginSuccess,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
