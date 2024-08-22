import React from 'react';
import styled from 'styled-components';
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
  gap: 40px;
`;

const MainPage = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <MainpageBanner />
        <SponsorContainer />
        <VideoCards />
        {/* <VisitorStats /> */}
      </MainContainer>
      <Footer />
    </>
  );
};

export default MainPage;
