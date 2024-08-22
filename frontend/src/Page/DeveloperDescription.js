import React, { useState } from 'react';
import styled from 'styled-components';
import { developerData } from '../Data/data';
import { Header, Footer, JobCategorySelector } from '../Component';

const ContentContainer = styled.div`
  margin: 30px auto 60px auto;
  max-width: 1200px; /* 중앙 정렬을 위한 최대 너비 */
  padding: 0 20px; /* 작은 화면에서의 패딩 */
  display: flex; /* 플렉스박스 레이아웃 사용 */
  flex-direction: column; /* 수직으로 콘텐츠를 쌓음 */
  flex-wrap: wrap; /* 작은 화면에서 자동으로 줄바꿈 */
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex; /* 플렉스박스 레이아웃 사용 */
  justify-content: center; /* 가로 중앙정렬 */
  align-items: center; /* 세로 중앙정렬 */
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 20px;
  }
`;

const TextContainer = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: left;
  color: ${({ theme }) => theme.primaryTextColor};
`;

const DescriptionImage = styled.img`
  width: 100%;
  max-width: 550px; /* 이미지의 최대 너비 설정 */
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const DescriptionText = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.secondaryTextColor};
  white-space: pre-line;
  background-color: ${({ theme }) => theme.backgroundLight};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
`;

function DeveloperDescription() {
  const [selectedCategory, setSelectedCategory] = useState('frontend');

  // 선택된 카테고리에 맞는 데이터 가져오기
  const { title, image, description } = developerData[selectedCategory];

  return (
    <>
      <Header page="developerDescription" />
      <JobCategorySelector
        selectedCategory={selectedCategory}
        onChange={(category) => setSelectedCategory(category)}
      />

      <ContentContainer>
        <ImageContainer>
          <DescriptionImage src={image} alt={title} />
        </ImageContainer>
        <TextContainer>
          <SectionTitle>{title}란?</SectionTitle>
          <DescriptionText>{description}</DescriptionText>
        </TextContainer>
      </ContentContainer>
      <Footer />
    </>
  );
}

export default DeveloperDescription;
