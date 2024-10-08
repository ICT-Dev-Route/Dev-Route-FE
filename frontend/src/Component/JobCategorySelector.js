import React from 'react';
import styled from 'styled-components';

// 스타일이 적용된 전체 컨테이너
const CategoryContainer = styled.div`
  background-color: ${({ theme }) =>
    theme.JobCategorySelectorBackground}; // 밝은 회색 배경
  padding: 15px 0; // 상하 패딩만 지정
  border-radius: 8px; // 모서리 둥글게
`;

// 항목들을 감싸는 내부 컨테이너, 여백 설정
const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; // 옵션 사이의 간격
  margin-left: 10%; // 항목이 시작되는 좌측 여백
  width: 80%; // 남은 너비는 80%로 설정
`;

// 각 카테고리 아이템에 대한 스타일 컴포넌트
const CategoryItem = styled.div`
  padding: 8px 12px;
  background: ${({ theme }) =>
    theme.JobCategorySelectorItemBackground}; // 각 옵션의 배경 색상
  border: 2px solid ${({ theme }) => theme.JobCategorySelectorItemBoarder}; // 테두리 색상
  border-radius: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.JobCategorySelectorItemText}; // 글자 색상
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  text-decoration: none; // 밑줄 제거

  &:hover {
    background-color: ${({ theme }) =>
      theme.JobCategorySelectorItemHoverBackground}; // 호버 시 배경 색상 변경
  }
`;

function JobCategorySelector({ selectedCategory, onChange }) {
  const categories = ['frontend', 'backend', 'mobile', 'ai', 'datascience'];

  function getCategoryName(code) {
    const names = {
      frontend: '웹 프론트엔드',
      backend: '웹 백엔드',
      mobile: '모바일',
      ai: '인공지능',
      datascience: '데이터사이언스',
    };
    return names[code] || code;
  }

  return (
    <CategoryContainer>
      <ItemsContainer>
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            active={selectedCategory === category}
            onClick={() => onChange(category)}
          >
            {getCategoryName(category)}
          </CategoryItem>
        ))}
      </ItemsContainer>
    </CategoryContainer>
  );
}

export default JobCategorySelector;
