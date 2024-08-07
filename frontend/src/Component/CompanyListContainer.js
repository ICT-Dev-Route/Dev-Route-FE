import React from 'react';
import CompanyListItem from './CompanyListItem';
import styled from 'styled-components';

const ListContainer = styled.div`
  margin: 20px;
`;

const CompanyListContainer = ({ companies, onCompanyClick }) => {
  return (
    <ListContainer>
      {companies.map((company) => (
        <CompanyListItem
          key={company.id}
          company={company}
          onClick={() => onCompanyClick(company)}
        />
      ))}
    </ListContainer>
  );
};

export default CompanyListContainer;
