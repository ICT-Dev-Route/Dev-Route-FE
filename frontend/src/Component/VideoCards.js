import React from 'react';
import styled from 'styled-components';
import VideoCardItem from './VideoCardsItem';

const VideoCards = () => {
  return (
    <div className="row text-center">
      <VideoCardItem
        src="https://via.placeholder.com/400x200?text=Video+1"
        alt="강의 영상 1"
        description="한 달만에 합격한 비밀! 독점 노하우"
      />
      <VideoCardItem
        src="https://via.placeholder.com/400x200?text=Video+2"
        alt="강의 영상 2"
        description="따라하면 합격하는 자소서의 구조"
      />
      <VideoCardItem
        src="https://via.placeholder.com/400x200?text=Video+3"
        alt="강의 영상 3"
        description="앱 개발 온라인 강의 BEST 기획전"
      />
    </div>
  );
};

export default VideoCards;
