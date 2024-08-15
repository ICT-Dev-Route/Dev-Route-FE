import React, { useEffect, useState } from 'react';
import VideoCardItem from './VideoCardsItem';
import { IP_ADDRESS, PORT } from '../Secret/env';

const VideoCards = () => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await fetch(
          `http://${IP_ADDRESS}:${PORT}/main/lectures`
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
    <div className="row text-center">
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
  );
};

export default VideoCards;
