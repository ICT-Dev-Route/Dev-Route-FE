import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PORT, IP_ADDRESS } from '../Secret/env';
import {
  Header,
  Footer,
  MainpageBanner,
  SponsorContainer,
  VideoCards,
  VisitorStats,
} from '../Component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
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
          console.log('Token stored in localStorage:', token);
        } else {
          navigate('/mainpage');
        }
      } catch (error) {
        console.error('Failed to fetch token:', error);
        navigate('/mainpage');
      }
    };

    fetchToken();
  }, [navigate]);

  return (
    <>
      <Header />
      <MainContainer>
        <MainpageBanner />
        <SponsorContainer />
        <VideoCards />
        <VisitorStats />
      </MainContainer>
      <Footer />
    </>
  );
};

export default MainPage;
