import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';
import { BANNERIMAGE1, BANNERIMAGE2, BANNERIMAGE3 } from '../Assets';
import MainpageBannerItem from './MainpageBannerItem';

const BannerContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 300px;
  overflow: hidden;
  background-color: #f8f9fa;
`;

const MainpageBanner = () => {
  return (
    <BannerContainer>
      <Carousel>
        <Carousel.Item>
          <MainpageBannerItem
            title="개발을 더 쉽게"
            description="로드맵을 이용해 학습하세요. 초보 개발자들을 위한 가이드 및 학습 플랫폼"
            buttonText="데모버전 이용하기"
            imgSrc={BANNERIMAGE1}
            imgAlt="Slide 1 Image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <MainpageBannerItem
            title="지금 기업들은?"
            description="유명 회사들이 요구하는 기술스택을 확인하세요!"
            buttonText="회사 검색하기"
            imgSrc={BANNERIMAGE2}
            imgAlt="Slide 2 Image"
          />
        </Carousel.Item>
        <Carousel.Item>
          <MainpageBannerItem
            title="개발자 종류 확인하기"
            description="개발자에 대한 설명들을 확인하세요!"
            buttonText="회사 검색하기"
            imgSrc={BANNERIMAGE3}
            imgAlt="Slide 3 Image"
          />
        </Carousel.Item>
      </Carousel>
    </BannerContainer>
  );
};

export default MainpageBanner;
