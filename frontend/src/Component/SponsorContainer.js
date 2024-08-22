import React from 'react';
import styled from 'styled-components';
import { YOUTUBE, INFLEARN, UDEMY, JOBPLANET } from '../Assets';

const SponsorSection = styled.div`
  text-align: center;
  padding: 20px 0;

  h3 {
    text-align: center;
    margin-bottom: 20px;
  }

  img {
    margin: 0 40px;
    max-height: 80px;
  }
`;

const SponsorContainer = () => {
  return (
    <SponsorSection>
      <h3>이용한 서비스들 & 스폰서</h3>
      <div>
        <img src={YOUTUBE} alt="Youtube" />
        <img src={INFLEARN} alt="Inflearn" />
        <img src={UDEMY} alt="Udemy" />
        <img src={JOBPLANET} alt="Jobplanet" />
      </div>
    </SponsorSection>
  );
};

export default SponsorContainer;
