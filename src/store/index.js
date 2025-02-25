// import { configureStore } from '@reduxjs/toolkit'

// export const makeStore = () => {
//   return configureStore({
//     reducer: {}
//   })
// }

//store.jsx

"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { Provider } from "react-redux";

const rootReducer = combineReducers({
  auther: authReducer,
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

// export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
