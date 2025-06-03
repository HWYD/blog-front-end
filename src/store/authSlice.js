// import { createSlice } from '@reduxjs/toolkit';

// const authSlice  = createSlice({
//     name: 'auth', // slice 的名称，用于生成 action 类型
//     initialState: {
//         isLogin: false // 初始状态
//     },
//     reducers: {
//         login: (state) => {
//             state.isLogin = true;
//         },
//         logout: (state) => {
//             state.isLogin = false;
//         }
//     }
// });

// // 导出 action 创建函数
// export const { login, logout } = authSlice.actions;

// // 导出 reducer
// export default authSlice.reducer;

// authSlice.jsx

'use client' // this is a client side component

import { createSlice } from '@reduxjs/toolkit'
// import { RootState } from "../store";

// const initialState = {
//   value: 0,
// };

export const authSlice = createSlice({
  name: 'auther',
  initialState: {
    isLogin: false
  },
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    setLoginStatus: (state, action) => {
      const { payload } = action
      state.isLogin = payload
    }
  }
})

export const { setLoginStatus } = authSlice.actions

export const selectAuth = state => state.auther.isLogin

export default authSlice.reducer
