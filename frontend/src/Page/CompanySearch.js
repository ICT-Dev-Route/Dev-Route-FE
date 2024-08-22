import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom'; // useLocation 훅 사용
import {
  Header,
  Footer,
  CompanySearchModal,
  CompanyListContainer,
} from '../Component';
import { IP_ADDRESS, PORT } from '../Secret/env';

const StyledH2 = styled.h2`
  width: 80%;
  text-align: left;
  margin: 30px auto;
  margin-bottom: 0px;
`;

const CompanySearchPageContainer = styled.div`
  width: 85%;
  margin: 0px auto;
  padding: 5px;
  box-sizing: border-box;
  margin-bottom: 50px;
`;

function CompanySearch() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyDetails, setSelectedCompanyDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();

  // 페이지가 로드될 때 회사 목록을 불러오고, 만약 state에 companyId가 있으면 해당 회사를 선택
  useEffect(() => {
    const fetchCompanyInfo = async () => {
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

        // location.state에서 companyId 가져오기
        const companyIdFromState = location.state?.companyId;

        if (companyIdFromState) {
          const foundCompany = data.find(
            (company) => company.id === companyIdFromState
          );

          if (foundCompany) {
            setSelectedCompanyDetails(foundCompany);
            setShowModal(true); // 모달 열기
          } else {
            console.log('Company not found');
          }
        } else {
          console.log('No companyId in location.state');
        }
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };
    fetchCompanyInfo();
  }, [location.state]);

  // 회사 카드를 클릭했을 때 호출되는 함수
  const handleCompanyClick = (company) => {
    setSelectedCompanyDetails(company);
    setShowModal(true); // 모달 열기
  };

  // 모달을 닫을 때 호출되는 함수
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCompanyDetails(null); // 모달을 닫을 때 상세 정보를 초기화
  };

  return (
    <>
      <Header page="companySearch" />
      <StyledH2>기업 정보검색</StyledH2>
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
