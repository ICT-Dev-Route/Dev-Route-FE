import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  text-align: center;
  cursor: pointer; /* 커서 스타일 변경으로 클릭 가능 여부 표시 */

  .card-img-top {
    max-width: 100%;
    height: auto;
  }

  .card-body {
    padding: 10px;
  }

  .card-text {
    font-weight: 600;
  }
`;

const VideoCardItem = ({ src, alt, description, onClick }) => {
  return (
    <Card className="col-md-4" onClick={onClick}>
      <div className="card">
        <img className="card-img-top" src={src} alt={alt} />
        <div className="card-body">
          <p className="card-text">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default VideoCardItem;
