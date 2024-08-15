import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TechStackList from './TechStackList';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { IP_ADDRESS, PORT } from '../Secret/env';
import { useNavigate } from 'react-router-dom';

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
  position: relative;
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

const BookmarkButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
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

function CompanySearchModal({ show, companyID, onClose }) {
  const [companyDetail, setCompanyDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyInfo = async () => {
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
        console.error('Failed to fetch company info:', error);
      }
    };

    if (companyID) {
      fetchCompanyInfo();
    }
  }, [companyID]);

  const handleBookmarkClick = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('로그인 후 이용가능합니다!');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(
        `http://${IP_ADDRESS}:${PORT}/bookmark/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            id: companyDetail.id, 
            type: 'company',
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 400) {
          alert('로그인 후 이용가능합니다!');
          navigate('/login');
        } else {
          throw new Error('북마크 추가에 실패했습니다.');
        }
      } else {
        alert('성공적으로 북마크에 추가되었습니다.');
      }
    } catch (error) {
      console.error('북마크 요청 중 오류가 발생했습니다:', error);
    }
  };

  if (!show || !companyDetail) {
    return null;
  }

  return (
    <ModalOverlay show={show} onClick={onClose}>
      <CompanyModal onClick={(e) => e.stopPropagation()}>
        <CompanyHeader>
          <Logo
            src={companyDetail.logoUrl}
            alt={`${companyDetail.name} Logo`}
          />
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
          <BookmarkButton onClick={handleBookmarkClick}>북마크</BookmarkButton>
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
