import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IP_ADDRESS, PORT } from '../Secret/env';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !isLoggedOut) {
      setToken(storedToken);
    }
  }, [isLoggedOut]);

  useEffect(() => {
    if (!token && !isLoggedOut) {
      fetchToken();
    }
  }, [token, isLoggedOut]);

  const fetchToken = async () => {
    try {
      const response = await fetch(`http://${IP_ADDRESS}:${PORT}/token`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const newToken = await response.text();
        localStorage.setItem('token', newToken);
        setToken(newToken);
      } else {
        console.error('로그인 되어있지 않음');
      }
    } catch (error) {
      console.error('Failed to fetch token:', error);
      navigate('/mainpage');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsLoggedOut(true);
    alert('로그아웃 되었습니다!');
    navigate('/mainpage');
  };

  return (
    <AuthContext.Provider value={{ token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
