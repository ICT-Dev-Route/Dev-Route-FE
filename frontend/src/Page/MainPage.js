import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PORT, IP_ADDRESS } from '../Secret/env';
import { Header, Footer } from '../Component';

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(`http://${IP_ADDRESS}:${PORT}/token`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const token = await response.text();
          localStorage.setItem('token', token);
          // console.log('Token stored in localStorage:', token);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Failed to fetch token:', error);
        navigate('/login');
      }
    };

    fetchToken();
  }, [navigate]);

  return (
    <>
      <Header />
      <MainContainer>
        <h1>Welcome to the Main Page</h1>
      </MainContainer>
      <Footer />
    </>
  );
};

export default MainPage;
