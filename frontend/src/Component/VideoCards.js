import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import VideoCardItem from './VideoCardsItem';
import { IP_ADDRESS, PORT } from '../Secret/env';

// 스타일 컴포넌트 정의
const VideoCardsContainer = styled.div`
  text-align: center;
  width: 80%;
  margin-bottom: 60px;

  h3 {
    text-align: left;
    margin-bottom: 20px;
  }

  .row {
    display: flex;
    justify-content: center; // Flex를 사용하여 내부 요소들을 가운데 정렬
  }
`;

const VideoCards = () => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await fetch(
          `https://${IP_ADDRESS}:${PORT}/main/lectures`
        );
        if (!response.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        setLectures(data);
      } catch (error) {
        console.error('Error fetching lectures:', error);
      }
    };

    fetchLectures();
  }, []);

  const handleCardClick = (url) => {
    window.open(url, '_blank'); // URL을 새 창에서 열기
  };

  return (
    <VideoCardsContainer>
      <h3>금주의 인기 강의들</h3>
      <div className="row">
        {lectures.map((lecture) => (
          <VideoCardItem
            key={lecture.id}
            src={lecture.thumnail_url}
            alt={lecture.title}
            description={lecture.title}
            onClick={() => handleCardClick(lecture.url)}
          />
        ))}
      </div>
    </VideoCardsContainer>
  );
};

export default VideoCards;
