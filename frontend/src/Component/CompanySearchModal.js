import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TechStackList from './TechStackList';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { IP_ADDRESS, PORT } from '../Secret/env';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1040;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? '1' : '0')};
  transition: visibility 0.3s, opacity 0.3s;
`;

const CompanyModal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 20px;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CompanyName = styled.h2`
  font-size: 24px;
  margin-bottom: 5px;
`;

const CompanyInfo = styled.p`
  line-height: 1.5;
  margin-bottom: 10px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Salary = styled.span`
  color: green;
  font-weight: bold;
`;

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const totalStars = fullStars + (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} color="#ffc107" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" color="#ffc107" />);
  }
  for (let i = totalStars; i < 5; i++) {
    stars.push(<FaRegStar key={i} color="#ccc" />);
  }
  return stars;
};

function CompanySearchModal({ show, company, companyID = 1, onClose }) {
  const [companyDetail, setCompanyDetail] = useState();
  useEffect(() => {
    const CompanyInfo = async () => {
      const url = `http://${IP_ADDRESS}:${PORT}/recruit/company/${companyID}`;

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
        setCompanyDetail(data);
        console.log('recruit', data);
      } catch (error) {
        console.error('Failed to fetch tech stack:', error);
      }
    };

    if (companyID) {
      CompanyInfo();
    }
  }, []);
  if (!show || !companyDetail) {
    return null;
  }

  return (
    <ModalOverlay show={show} onClick={onClose}>
      <CompanyModal onClick={(e) => e.stopPropagation()}>
        <CompanyHeader>
          <Logo src={companyDetail.logo} alt={`${companyDetail.name} Logo`} />
          <DetailsContainer>
            <CompanyName>{companyDetail.name}</CompanyName>
            <CompanyInfo>
              {companyDetail.info || 'No description available.'}
            </CompanyInfo>
            <Rating>
              <strong>Rating:</strong> {renderStars(companyDetail.grade)}
            </Rating>
            <Salary>
              <strong>Average Salary:</strong> {companyDetail.averageSalary}{' '}
              만원
            </Salary>
          </DetailsContainer>
        </CompanyHeader>

        {companyDetail.recruitments && companyDetail.recruitments.length > 0 ? (
          <TechStackList items={companyDetail.recruitments} />
        ) : (
          <h3>채용공고가 없습니다.</h3>
        )}
      </CompanyModal>
    </ModalOverlay>
  );
}

export default CompanySearchModal;
