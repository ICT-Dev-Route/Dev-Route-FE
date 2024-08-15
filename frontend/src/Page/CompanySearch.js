import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Header,
  Footer,
  CompanySearchModal,
  CompanyListContainer,
} from '../Component';
import { IP_ADDRESS, PORT } from '../Secret/env';

const CompanySearchPageContainer = styled.div`
  width: 85%;
  margin: 20px auto;
  padding: 20px;
  box-sizing: border-box;
`;

function CompanySearch() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedCompanyDetails, setSelectedCompanyDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCompanyClick = (company) => {
    setSelectedCompanyId(company.id);
    // 회사 상세 정보 설정
    const foundCompany = companies.find((c) => c.id === company.id);
    setSelectedCompanyDetails(foundCompany);
    console.log('ID : ', company.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCompanyDetails(null); // 모달 닫을 때 상세 정보 초기화
  };

  useEffect(() => {
    const CompanyInfo = async () => {
      const url = `http://${IP_ADDRESS}:${PORT}/recruit/enterprise`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCompanies(data);
        console.log('recruit', data);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };
    CompanyInfo();
  }, []);

  return (
    <>
      <Header page="companySearch" />
      <CompanySearchPageContainer>
        <CompanyListContainer
          companies={companies}
          onCompanyClick={handleCompanyClick}
        />
        {showModal && selectedCompanyDetails && (
          <CompanySearchModal
            show={showModal}
            company={selectedCompanyDetails}
            companyID={selectedCompanyDetails.id}
            onClose={handleCloseModal}
          />
        )}
      </CompanySearchPageContainer>
      <Footer />
    </>
  );
}

export default CompanySearch;
