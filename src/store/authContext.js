// src/context/auth-context.js
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from "js-cookie"
const AuthContext = createContext({
  loginStatus: false,
  login: () => {},
  logout: () => {}
});

export function AuthProvider({ children, initialAuth }) {
  const [authState, setAuthState] = useState({
    loginStatus: initialAuth,
  });

  const login = (userData) => {
    setAuthState({
      loginStatus: true,
    });
    // 这里可以添加设置Cookie的逻辑
  };

  const logout = () => {
    setAuthState({
      loginStatus: false,
    });
    Cookies.remove('authorization')
    // 这里可以添加删除Cookie的逻辑
    // fetch('/api/logout', { method: 'POST' });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);