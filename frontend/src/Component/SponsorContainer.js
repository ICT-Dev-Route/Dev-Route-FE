import React from 'react';
import styled from 'styled-components';

const SponsorSection = styled.div`
  text-align: center;
  padding: 20px 0;

  img {
    margin: 0 10px;
    max-height: 50px;
  }
`;

const SponsorContainer = () => {
  return (
    <SponsorSection>
      <h3>도움을 받은 서비스 및 스폰서</h3>
      <div>
        <img
          src="https://via.placeholder.com/150x50?text=Sponsor+1"
          alt="Sponsor 1"
        />
        <img
          src="https://via.placeholder.com/150x50?text=Sponsor+2"
          alt="Sponsor 2"
        />
        <img
          src="https://via.placeholder.com/150x50?text=Sponsor+3"
          alt="Sponsor 3"
        />
        <img
          src="https://via.placeholder.com/150x50?text=Sponsor+4"
          alt="Sponsor 4"
        />
        <img
          src="https://via.placeholder.com/150x50?text=Sponsor+5"
          alt="Sponsor 5"
        />
      </div>
    </SponsorSection>
  );
};

export default SponsorContainer;
