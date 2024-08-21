import React from 'react';
import styled, { useTheme } from 'styled-components';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.companyListItemBackground};
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
`;

const NameAndPosts = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Details = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.companyListItemDetails};
`;

const RatingsAndSalary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Rating = styled.span`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Salary = styled.span`
  color: ${({ theme }) => theme.companyListItemSalary};
  font-weight: bold;
`;

const CompanyListItem = ({ company, onClick }) => {
  const theme = useTheme();

  const renderStars = (rating) => {
    let stars = [];
    const roundedRating = Math.round(rating * 2) / 2; // 별점을 가장 가까운 0.5 단위로 반올림
    const fullStars = Math.floor(roundedRating); // 전체 별의 개수
    const hasHalfStar = roundedRating % 1 !== 0; // 반 별이 있는지 판단 (0.5가 있으면 true)

    console.log('fullStars', fullStars);
    console.log('hasHalfStar', hasHalfStar);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} color={theme.companyListItemStar} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" color={theme.companyListItemStar} />
      );
    }

    const totalStarsDisplayed = fullStars + (hasHalfStar ? 1 : 0);
    for (let i = totalStarsDisplayed; i < 5; i++) {
      stars.push(
        <FaRegStar key={`empty-${i}`} color={theme.companyListItemStar} />
      );
    }

    return stars;
  };

  return (
    <Item onClick={onClick}>
      <Logo src={company.logoUrl} alt={`${company.name} Logo`} />
      <InfoContainer>
        <NameAndPosts>
          <Name>{company.name}</Name>
          <Details>모집중인 구인공고 수: {company.recruitmentCount}개</Details>
        </NameAndPosts>
        <RatingsAndSalary>
          <Rating>{renderStars(company.grade)}</Rating>
          <Salary>{company.salary} 만원</Salary>
        </RatingsAndSalary>
      </InfoContainer>
    </Item>
  );
};

export default CompanyListItem;
