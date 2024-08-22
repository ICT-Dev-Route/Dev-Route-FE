import React from 'react';
import styled from 'styled-components';

// TechStackList 스타일 정의
const TechStackTable = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  border: 1px solid ${({ theme }) => theme.techStackListBorder};

  th,
  td {
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.techStackItemBorder};
  }

  th {
    background-color: ${({ theme }) => theme.techStackListBackground};
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
          <td>{item.companyName}</td>
          <td>{item.developField}</td>
          <td>{item.techStacks.join(', ')}</td>
          <td>{item.dueDate}</td>
        </tr>
      ))}
    </tbody>
  </TechStackTable>
);

export default TechStackList;
