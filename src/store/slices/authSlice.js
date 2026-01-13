import { createSlice } from "@reduxjs/toolkit";



const getTokenFromStorage = () => {
  return sessionStorage.getItem("token") || null;
}
const authSlice = createSlice({
  name: "auth",
  initialState: {
    authToken: getTokenFromStorage(),
    fullName: null,
    email: null,
  },
  reducers: {
    
    updateAuth: (state, action) => {
      state.authToken = action.payload.token;
      state.fullName = action.payload.fullName || null;
      state.email = action.payload.email || null;
    },
    
    
    clearAuth: (state, action) => {
      state.authToken = null;
      state.fullName = null;
      state.email = null;
      localStorage.clear('auth');
    },
  },
});

export const { updateAuth, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;