import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

// 스타일드 컴포넌트 정의
const BannerItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 300px;
  font-size: 24px;
  padding: 20px 200px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 50%;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 3rem;
  color: ${({ theme }) => theme.MainpageBannerTitle};
`;

const Description = styled.p`
  font-size: 1rem;
  margin: 10px 0;
  color: ${({ theme }) => theme.MainpageBannerDetail};
`;

const StyledButton = styled(Button)`
  font-size: 1.25rem;
  font-weight: 600;
  background-color: ${({ theme }) => theme.MainpageBannerBtn};
  border: none;
  margin-top: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.MainpageBannerBtnHover};
  }
`;

const ImageContainer = styled.div`
  max-width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

const BannerImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const MainpageBannerItem = ({
  title,
  description,
  buttonText,
  imgSrc,
  imgAlt,
}) => {
  return (
    <BannerItemContainer>
      <TextContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <StyledButton>{buttonText}</StyledButton>
      </TextContainer>
      <ImageContainer>
        <BannerImage src={imgSrc} alt={imgAlt} />
      </ImageContainer>
    </BannerItemContainer>
  );
};

export default MainpageBannerItem;
