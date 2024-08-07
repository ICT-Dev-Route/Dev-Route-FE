import React from 'react';
import styled from 'styled-components';
import VisitorStatsItem from './VisitorStatsItem'; // VisitorStatsItem 컴포넌트 임포트

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  background-color: #f8f9fa;
  text-align: center;
`;

const VisitorStats = () => {
  return (
    <Stats>
      <VisitorStatsItem title="Daily Visitor" count="100" />
      <VisitorStatsItem title="Weekly Visitor" count="400" />
      <VisitorStatsItem title="Total Visitor" count="11021" />
    </Stats>
  );
};

export default VisitorStats;
