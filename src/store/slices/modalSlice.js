import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginOpen: false,
  signupOpen: false,
  createTodoOpen: false,
  refreshTodos: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openCreateTodo: (state) => {
      state.createTodoOpen = true;
    },
    closeCreateTodo: (state) => {
      state.createTodoOpen = false;
    },
    openLogin: (state) => {
      state.loginOpen = true;
    },
    closeLogin: (state) => {
      state.loginOpen = false;
    },
    openSignup: (state) => {
      state.signupOpen = true;
    },
    closeSignup: (state) => {
      state.signupOpen = false;
    },
    triggerTodosRefresh: (state) => {
      state.refreshTodos = !state.refreshTodos;
    },
  },
});

export const { 
  openLogin, 
  closeLogin, 
  openSignup, 
  closeSignup, 
  openCreateTodo, 
  closeCreateTodo,
  triggerTodosRefresh
} = modalSlice.actions;

export default modalSlice.reducer;