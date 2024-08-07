import React from 'react';
import styled from 'styled-components';

// TechStackList 스타일 정의
const TechStackTable = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  border: 1px solid #ccc;

  th,
  td {
    padding: 8px;
    border: 1px solid #ccc;
  }

  th {
    background-color: #f8f9fa;
  }
`;

// TechStackList 컴포넌트
const TechStackList = ({ items }) => (
  <TechStackTable className="table">
    <thead>
      <tr>
        <th>회사</th>
        <th>직종</th>
        <th>기술</th>
        <th>공고 날짜</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item, index) => (
        <tr key={index}>
          <td>{item.company}</td>
          <td>{item.jobTitle}</td>
          <td>{item.tech}</td>
          <td>{item.date}</td>
        </tr>
      ))}
    </tbody>
  </TechStackTable>
);

export default TechStackList;
