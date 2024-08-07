import React from 'react';
import styled from 'styled-components';

const StatContainer = styled.div`
  text-align: center;
`;

const VisitorStatsItem = ({ title, count }) => {
  return (
    <StatContainer>
      <h4>{title}</h4>
      <p>{count}명의 사용자가 방문했습니다</p>
    </StatContainer>
  );
};

export default VisitorStatsItem;
