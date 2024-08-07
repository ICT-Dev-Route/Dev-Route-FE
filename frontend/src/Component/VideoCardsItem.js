import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  text-align: center;

  .card-img-top {
    max-width: 100%;
    height: auto;
  }

  .card-body {
    padding: 10px;
  }
`;

const VideoCardItem = ({ src, alt, description }) => {
  return (
    <Card className="col-md-4">
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
